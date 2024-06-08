import { CSSProperties } from 'react';
import { GrEdit } from 'react-icons/gr';

type Props = {
  id?: string;
  style?: CSSProperties;
  classNameButton?: string;
  size?: string;
  onClick: () => void;
};

function ButtonEdit({
  id,
  style = {},
  classNameButton = 'formComponents-buttonEdit-position-absolute',
  size = '18',
  onClick,
}: Props) {
  const buttonStyles = {
    width: `${size}px`,
    height: `${size}px`,
  };

  const svgStyles = {
    width: `inherit`,
    height: `inherit`,
  };

  return (
    <button
      id={id}
      type="button"
      className={classNameButton}
      style={{ ...buttonStyles, ...style }}
      onClick={() => onClick()}
    >
      <GrEdit style={svgStyles} />
    </button>
  );
}

export default ButtonEdit;
