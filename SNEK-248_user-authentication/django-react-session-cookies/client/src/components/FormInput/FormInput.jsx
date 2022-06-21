import React, { useState } from 'react';
import './formInput.css';

const FormInput = ({ id, label, errorMessage, onChange, ...inputProps }) => {
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInputContainer">
      <label>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() => inputProps.name === 'confirmPassword' && setFocused(true)}
        focused={focused.toString()}
      />
      <span className="formErrorMsg">{errorMessage}</span>
    </div>
  );
};

export default FormInput;