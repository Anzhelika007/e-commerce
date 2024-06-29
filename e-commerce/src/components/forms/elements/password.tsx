import { CSSProperties, ReactNode, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  classNameComponent?: string;
  title: string;
  placeholder?: string;
  isRequired?: boolean;
  className?: string;
  classNameButton?: string;
  errorMessage?: string;
  style?: CSSProperties;
  after?: ReactNode;
  registerObject: UseFormRegisterReturn;
};

function Password({
  id,
  classNameComponent = 'input-wrapper',
  title,
  placeholder,
  isRequired,
  className = 'input-text',
  classNameButton = 'btn-show',
  errorMessage,
  style,
  after,
  registerObject,
}: Props) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={classNameComponent}>
      <label htmlFor={id}>
        {title}
        {after}
        {isRequired && '*'}
        <input
          id={id}
          type={showPassword ? 'text' : 'password'}
          placeholder={placeholder}
          className={`${className} ${
            errorMessage ? 'error-background-input' : ''
          }`}
          style={style}
          autoComplete="on"
          {...registerObject}
        />
      </label>
      {errorMessage && <div className="input-error">{errorMessage}</div>}
      <button
        type="button"
        className={classNameButton}
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? 'Hide' : 'Show'}
      </button>
    </div>
  );
}

export default Password;
