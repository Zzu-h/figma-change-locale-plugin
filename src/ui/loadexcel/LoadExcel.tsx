import React, { ChangeEvent, useState } from 'react';
import EditText from '../component/EditText';
import { ExcelUtil } from '../util/ExcelUtil';
import { GlobalVars } from '../../shared';

function LoadExcel ({callback}) {

  const [isLoading, setIsLoading] = useState(false);
  const [completFlag, setCompleteFlag] = useState(true);
  const [excelData, setExcelData] = useState<any[] | null>(null);

  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true);
      const parsedData = await ExcelUtil.parseExcelFile(file, textValue);
      GlobalVars.datas = parsedData;
      setExcelData(parsedData);
      setIsLoading(false);
    }
  };
  
  const [textValue, setTextValue] = useState<string>('');

  const onTextChange = (id: string, value: string) => {
    setTextValue(value);
  };

  const onClickRunButton = () => {
    if(completFlag)
      setCompleteFlag(false);
    else
      callback(textValue);
  }
  
  return (
    <div>
      {completFlag ?<EditText id="textInput" label="Primary Key:" value={textValue} onChange={onTextChange} /> : <input type="file" accept=".xlsx, .xls" onChange={handleFileUpload} />}
      
      <button type="button" id="run" onClick={onClickRunButton}>{isLoading ? "Loading..." : "OK"}</button>
    </div>
  );
};

export default LoadExcel;