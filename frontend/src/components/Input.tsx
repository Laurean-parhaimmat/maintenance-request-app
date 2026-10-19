import type { ChangeEvent } from "react";

interface InputProps {
  // Required props
  type: "text" | "email" | "password";
  label: string;
  value: string;
  name: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  // Optional props
  error?: string;
  disabled?: boolean;
}

export default function Input({
  type,
  label,
  value,
  name,
  placeholder,
  error,
  disabled = false,
  onChange,
}: InputProps) {
  return (
    <div className="input-wrapper">
      <label htmlFor={label}>{label}</label>
      <input
        type={type}
        id={label}
        value={value}
        name={name}
        placeholder={placeholder}
        onChange={onChange}
        disabled={disabled}
      />
      {error && <p className="error">{error}</p>}
    </div>
  );
}

//export default Input;
