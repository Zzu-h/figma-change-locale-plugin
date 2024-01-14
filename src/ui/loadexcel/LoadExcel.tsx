import React, { ChangeEvent, useState } from 'react';
import EditText from '../component/EditText';
import { GlobalVars } from '../../shared';
import { ExcelUtil } from '../../shared/util/ExcelUtil';

function LoadExcel ({callback}) {

  const [isLoading, setIsLoading] = useState(false);
  const [completFlag, setCompleteFlag] = useState(true);
  const [textValue, setTextValue] = useState<string>('');
 
  const handleFileUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setIsLoading(true);
      await ExcelUtil.parseExcelFile(file, textValue);
      setIsLoading(false);
    }
  };

  const onTextChange = (id: string, value: string) => {
    setTextValue(value);
  };

  const onClickRunButton = () => {
    if(textValue == "")
      return;
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