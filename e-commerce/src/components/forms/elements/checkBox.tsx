import { UseFormRegisterReturn } from 'react-hook-form';

type Props = {
  id: string;
  title: string;
  className?: string;
  registerObject: UseFormRegisterReturn;
};

function CheckBox({
  id,
  title,
  className = 'input-checkbox',
  registerObject,
}: Props) {
  return (
    <label htmlFor={id}>
      <input
        id={id}
        type="checkbox"
        className={className}
        {...registerObject}
      />
      {title}
    </label>
  );
}

export default CheckBox;
