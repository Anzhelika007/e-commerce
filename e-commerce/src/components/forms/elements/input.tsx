import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  classNameComponent?: string;
  inputType?: 'text' | 'date' | 'password';
  title: string;
  placeholder?: string;
  isRequired: boolean;
  className?: string;
  errorMessage?: string;
  style?: CSSProperties;
  registerObject: UseFormRegisterReturn;
  disabled?: boolean;
  value?: string;
};

function Input({
  id,
  classNameComponent,
  inputType = 'text',
  title,
  placeholder,
  isRequired,
  className = 'input-text',
  errorMessage,
  style,
  registerObject,
  disabled,
  value,
}: Props) {
  return (
    <div className={classNameComponent}>
      <label htmlFor={id}>
        {title}
        {isRequired && '*'}
        <input
          id={id}
          disabled={disabled}
          type={inputType}
          placeholder={placeholder}
          className={`${className} ${
            errorMessage ? 'error-background-input' : ''
          }`}
          style={style}
          autoComplete="url"
          value={value}
          {...registerObject}
        />
        {errorMessage && <div className="input-error">{errorMessage}</div>}
      </label>
    </div>
  );
}

export default Input;
