import React, { useState } from 'react';
import RadioButton from '../component/RadioButton';
import { GlobalVars } from '../../shared';
import { updateTextToPlugin } from '../lib/figma';

function Running({keyId}){
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onRadioButtonChange = (id: string, label: string) => {
    setSelectedOption(label);
  };

  const onClickRunButton = () => {
    var tempData = JSON.stringify(Object.fromEntries(GlobalVars.mapData));
    updateTextToPlugin({keyId: keyId, language: selectedOption, dataSet: mapToString(GlobalVars.mapData)});
  }

  function mapToString(inputMap: Map<string, Map<string, string>>): string {
    const serializedMap: Record<string, Record<string, string>> = {};
  
    inputMap.forEach((innerMap, key) => {
      serializedMap[key] = {};
      innerMap.forEach((value, innerKey) => {
        serializedMap[key][innerKey] = value;
      });
    });
  
    return JSON.stringify(serializedMap);
  }
  

  return (
    <div>
      <div id="toast-container"></div>
      <p>Selected option: {selectedOption}</p>
      {GlobalVars.lanList.map((item: string, index: number) =>
        <RadioButton id={index.toString()} label={item} groupName="options" onChange={onRadioButtonChange} />
      )}
      <br/>

      <button type="button" id="run" onClick={onClickRunButton}>Run</button>
    </div>
  );
};

export default Running;
