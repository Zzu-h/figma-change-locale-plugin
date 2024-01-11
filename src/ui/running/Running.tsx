import React, { useState } from 'react';
import RadioButton from '../component/RadioButton';
import EditText from '../component/EditText';
import { showToast } from '../../plugin';

const Running: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const onRadioButtonChange = (id: string) => {
    setSelectedOption(id);
  };

  const [textValue, setTextValue] = useState<string>('');

  const onTextChange = (id: string, value: string) => {
    setTextValue(value);
  };

  const onClickRunButton = () => {
    setTextValue("test");
  }

  return (
    <div>
      <div id="toast-container"></div>
      <EditText id="textInput" label="Primary Key:" value={textValue} onChange={onTextChange} />
      <p>Selected option: {selectedOption}</p>

      <RadioButton id="option1" label="Option 1" groupName="options" onChange={onRadioButtonChange} />
      <RadioButton id="option2" label="Option 2" groupName="options" onChange={onRadioButtonChange} />
      <RadioButton id="option3" label="Option 3" groupName="options" onChange={onRadioButtonChange} />
      <br/>

      <button type="button" id="run" onClick={onClickRunButton}>Run</button>
    </div>
  );
};

export default Running;
