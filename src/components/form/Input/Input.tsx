import React, { useCallback, useMemo, useState } from "react";

import generateHash from "utils/hash";
import { Fieldset } from "./style";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  counter?: boolean;
  ref?: React.LegacyRef<HTMLInputElement> | undefined;
}

const Input: React.FC<InputProps> = ({ label, counter, value, defaultValue, maxLength, onChange, ...props }) => {
  const [current, setCurrent] = useState(defaultValue || value || "");

  const hash = useMemo(() => {
    return generateHash({
      amount: 20,
      lowercase: true,
      uppercase: true,
      numbers: true,
    });
  }, []);

  const handleChangeValue = useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = ev.target.value;

    setCurrent(inputValue);
    onChange && onChange(ev);
  }, [onChange]);

  return (
    <Fieldset>
      <input {...props} placeholder=" " id={hash} value={current} maxLength={maxLength} onChange={handleChangeValue} />
      <label aria-labelledby={label} htmlFor={hash}>
        {label}
      </label>
      <legend>{label}</legend>
      {counter && (
        <small>
          {String(current || "")?.length}
          {maxLength ? "/" + maxLength : ""}
        </small>
      )}
    </Fieldset>
  );
};

export default Input;