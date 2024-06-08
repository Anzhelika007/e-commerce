import { CSSProperties } from 'react';
import { LuDelete } from 'react-icons/lu';

type Props = {
  id?: string;
  style?: CSSProperties;
  classNameButton?: string;
  size?: string;
  onClick: () => void;
};

function ButtonDelete({
  id,
  style = {},
  classNameButton = 'formComponents-buttonEdit-position-absolute',
  size = '22',
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
      <LuDelete style={svgStyles} />
    </button>
  );
}

export default ButtonDelete;
