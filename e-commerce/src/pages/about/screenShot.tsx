import Modal from 'react-modal';

type Props = {
  screen: string;
};

export default function ScreenShot({ screen }: Props) {
  return (
    <>
      <Modal
        isOpen={false}
        className="modal-screen-shot"
        ariaHideApp={false}
        bodyOpenClassName="modal-body"
      >
        <div className="screen-modal-wrapper">
          <img src={screen} className="screen-shot-img" alt="screen-shot" />
        </div>
      </Modal>

      <button type="button" className="screen-shot-btn">
        <img className="screen-shot" src={screen} alt="screen-shot" />
      </button>
    </>
  );
}
