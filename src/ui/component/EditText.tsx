import React, { ChangeEvent } from 'react';

interface EditTextProps {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void;
}

const EditText: React.FC<EditTextProps> = ({ id, label, value, onChange }) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    onChange(id, newValue);
  };

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        id={id}
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default EditText;