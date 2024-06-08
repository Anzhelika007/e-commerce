import { CSSProperties } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  classNameComponent?: string;
  isRequared: boolean;
  className?: string;
  errorMessage?: string;
  style?: CSSProperties;
  registerObject: UseFormRegisterReturn;
  onChangeHandler: () => void;
};

function Country({
  id,
  classNameComponent,
  isRequared,
  className = 'input-text',
  errorMessage,
  style,
  registerObject,
  onChangeHandler,
}: Props) {
  return (
    <div className={classNameComponent}>
      <label htmlFor={id}>
        Country{isRequared && '*'}
        <select
          id={id}
          className={`${className} ${
            errorMessage ? 'error-background-input' : ''
          }`}
          style={style}
          {...registerObject}
          onChange={() => onChangeHandler()}
        >
          <option value="-">--- Choose ---</option>
          <option value="BY">Belarus</option>
          <option value="GE">Georgia</option>
          <option value="RU">Russia</option>
          <option value="UA">Ukraine</option>
        </select>
        {errorMessage && <div className="input-error">{errorMessage}</div>}
      </label>
    </div>
  );
}

export default Country;
