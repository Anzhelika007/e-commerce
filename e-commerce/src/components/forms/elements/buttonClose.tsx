import { CSSProperties } from 'react';
import { MdClose } from 'react-icons/md';

type Props = {
  id: string;
  style?: CSSProperties;
  classNameButton?: string;
  size?: string;
  onClick: () => void;
};

function ButtonEdit({
  id,
  style = {},
  classNameButton = 'formComponents-buttons-position-absolute-right',
  size = '32',
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
      <MdClose style={svgStyles} />
    </button>
  );
}

export default ButtonEdit;
