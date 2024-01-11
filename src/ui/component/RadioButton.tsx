import React, { ChangeEvent } from 'react';

interface RadioButtonProps {
    id: string;
    label: string;
    groupName: string;
    onChange: (id: string) => void;
  }
  
const RadioButton: React.FC<RadioButtonProps> = ({ id, label, groupName, onChange }) => {
    const handleRadioButtonChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.checked) {
        onChange(id);
      }
    };
  
    return (
      <div>
        <input
          type="radio"
          id={id}
          name={groupName}
          onChange={handleRadioButtonChange}
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
};

export default RadioButton;