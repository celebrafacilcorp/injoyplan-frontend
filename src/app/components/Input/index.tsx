import { FC, useEffect, useRef } from "react";
import styles from "./input.module.css";

interface IInput {
  type?: string;
  name: string;
  placeholder?: string;
  onChange?: any;
  value?: string | number;
  label?: string;
  isLabel?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: any;
  onReset?: any;
  maxLength?: number;
  autocomplete?: string;
  defaultValue?: any;
  id?: string;
  onCopy?: any;
  onSelect?: any;
  onKeyDown?: any;
  reference?: any;
  min?: any
  max?: any
  onPaste?: any
  readOnly?: boolean;
  rows?: number;
  item?: string;
  searching?: boolean;
  autoFocus?: boolean
}

const Input: FC<IInput> = ({
  type = "text",
  name,
  searching,
  item,
  autoFocus,
  isLabel,
  placeholder,
  onChange,
  min,
  max,
  value,
  onClick,
  onReset,
  autocomplete,
  label,
  disabled,
  className,
  defaultValue,
  onKeyDown,
  reference,
  rows,
  id,
  maxLength,
  onCopy,
  onSelect,
}) => {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const renderInput = () => {
    const commonProps = {
      name,
      item,
      reference,
      searching,
      onKeyDown,
      rows,
      placeholder,
      onChange,
      min,
      max,
      onCopy,
      onSelect,
      autoFocus,
      value,
      onClick,
      onReset,
      disabled,
      className,
      ref: inputRef,
      autoComplete: autocomplete,
      id,
      defaultValue,
      maxLength,
    };

    const handleKeyPress = (e: any) => {
      const isControlKey =
        e.key === "Backspace" ||
        e.key === "Delete" ||
        e.key === "ArrowLeft" ||
        e.key === "ArrowRight" ||
        e.key === "Tab" ||
        ((e.ctrlKey || e.metaKey) &&
          (e.key.toLowerCase() === "c" || e.key.toLowerCase() === "x" || e.key.toLowerCase() === "v")); // Permite copiar, cortar y pegar
    };

    if (item === "numberOfSerieState" && type === "text") {
      return (
        <input
          className={className}
          onSelect={onSelect}
          name={name}
          id={id}
          autoComplete={autocomplete}
          x-webkit-speech
          autoFocus
          /* readOnly={searching} */ value={value}
          onClick={onClick}
          disabled={disabled}
          defaultValue={defaultValue}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          ref={reference}
          onKeyPress={(e) =>
            !/^[0-9]*[.,]?[0-9]*$/.test(e.key) && e.preventDefault()
          }
        />
      );
    }

    switch (type) {
      case "textarea":
        return (
          <textarea
            {...commonProps}
            ref={reference}
          />
        );
      case "text":
      case "date":
      case "time":
      case "email":
      case "password":
      case "number":
        return (
          <input
            type={type}
            {...commonProps}
            ref={reference}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.wrapper__input}>
      {/* <div className={styles.content__input}> */}
        {isLabel && <label className={styles.label}>{label}</label>}
      {/* </div> */}
      {renderInput()}
    </div>
  );
};

export default Input;
