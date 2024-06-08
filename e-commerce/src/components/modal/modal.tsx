import './modal.scss';
import PowerLayer from './powerLayer';
import close from '../../assets/img/icons/close.svg';

function Modal({
  displayNoneFlex,
  headerText = '',
  modalText = '',
}: {
  displayNoneFlex: React.CSSProperties;
  headerText: string;
  modalText: string;
}) {
  function handleClick() {
    return <PowerLayer displayNoneBlock={{ display: 'none' }} />;
  }
  return (
    <>
      <PowerLayer displayNoneBlock={{ display: 'block' }} />
      <div className="modal" style={displayNoneFlex}>
        <div className="modal-header">
          <div className="modal-header-text">{headerText}</div>
          <img
            className="close-btn"
            src={close}
            alt="close modal"
            role="presentation"
            onClick={handleClick}
          />
        </div>
        <p className="modal-text">{modalText}</p>
      </div>
    </>
  );
}

export default Modal;
