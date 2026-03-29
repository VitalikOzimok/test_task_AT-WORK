import { useState } from "react";
import styles from "./textField.module.scss";
import Close from "./../../../assets/icons/Close.svg";

interface TextFieldProps {
  label: string;
  placeholder?: string;
  type?: string;
  register: any;
  name: string;
  error?: string;
  value?: string;
}

export function TextField({
  label,
  placeholder,
  type = "text",
  register,
  name,
  error,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const fieldProps = register(name);

  const handleClear = () => {
    const event = {
      target: {
        name: name,
        value: "",
      },
    };
    fieldProps.onChange(event);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    fieldProps.onBlur(e);
    setIsFocused(false);
  };
  const handleFocus = () => {
    setIsFocused(true);
  };

  return (
    <div className={styles.textField}>
      <label className={styles.label} htmlFor={name}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          type={type}
          placeholder={placeholder}
          {...fieldProps}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`${styles.input} ${error ? styles.inputError : ""}`}
        />
        {isFocused &&
          fieldProps.value &&
          String(fieldProps.value).length > 0 && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Очистить поле"
            >
              <img src={Close} alt="Очистить" />
            </button>
          )}
      </div>
      {error && (
        <div className={styles.errorMessage} role="alert">
          {error}
        </div>
      )}
    </div>
  );
}
