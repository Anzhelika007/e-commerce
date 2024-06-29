import Modal from 'react-modal';
import { useState } from 'react';

type Props = {
  firstName: string;
  avatar: string;
  avatarName: string;
  photo: string;
  title: string;
  shortBio: string;
  gitHub: string;
  country: string;
  city: string;
  teamSay: string;
};

export default function Avatar({
  firstName,
  avatar,
  avatarName,
  title,
  photo,
  shortBio,
  gitHub,
  country,
  city,
  teamSay,
}: Props) {
  const [modalMemberCardIsOpen, setModalMemberCardIsOpen] = useState(false);

  const openModalMemberCard = () => {
    setModalMemberCardIsOpen(true);
  };

  const closeModalMemberCard = () => {
    setModalMemberCardIsOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={modalMemberCardIsOpen}
        onRequestClose={closeModalMemberCard}
        className="modal-member"
        overlayClassName="modal-overlay"
        ariaHideApp={false}
        bodyOpenClassName="modal-body"
      >
        <div className="modal-wrapper">
          <img
            src={photo}
            className="modal-img"
            alt={`${firstName} - ${title}`}
          />
          <div className="descr-wrapper">
            <p className="descr-title">{firstName}</p>
            <div className="descr-content">
              <p>
                <span>role: </span>FrontEnd Developer
              </p>
              <p>
                <span>bio: </span>
                <a href={shortBio} target="_blank" rel="noopener noreferrer">
                  You can look here
                </a>
              </p>
              <p>
                <span>gitHub: </span>
                <a href={gitHub} target="_blank" rel="noopener noreferrer">
                  {gitHub.split('/')[3]}
                </a>
              </p>
              <p>
                <span>country: </span>
                {country}
              </p>
              <p>
                <span>city: </span>
                {city}
              </p>
              <p>
                <span>teamSay: </span>
                {teamSay}
              </p>
            </div>
          </div>
        </div>
      </Modal>

      <button
        type="button"
        className="avatar-card"
        onClick={openModalMemberCard}
      >
        <img className="avatar-img" src={avatar} alt={avatarName} />
        <p className="avatar-title">{title}</p>
      </button>
    </>
  );
}
