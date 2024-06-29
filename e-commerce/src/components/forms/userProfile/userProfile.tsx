import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppDispatch } from '../../../redux/hooks';
import { logout, userInitial } from '../../../redux/store/userSlice';
// import store from '../../../redux/store/store';
import TextField from '../elements/textField';
import ChangePassword from '../floatForms/changePassword';
import UserMainData from '../floatForms/userMainData';
import { EditAddress } from '../floatForms/editAddress';
import { AddressesList } from './addressesList';
/* API */
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
import { deleteAddress } from '../../../services/api/changeAddresses';

function UserProfile(): React.ReactElement {
  const [userData, setUserData] = useState(userInitial);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  async function updateUserData() {
    const user = await getCustomerInfo(dispatch, true);
    if (!user.isError) setUserData(user.thing!);
  }

  const showToast = ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => {
    updateUserData();
    if (!thisError) {
      toast.success(message);
    } else {
      toast.error(message);
    }
  };

  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);
  const [modalMainIsOpen, setModalMainIsOpen] = useState(false);
  const [modalAddressIsOpen, setModalAddressIsOpen] = useState(false);
  const [modalAddressID, setModalAddressID] = useState('');
  // Modal.setAppElement('#root');

  const modalStyles = {
    content: {
      top: '20%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -20%)',
    },
  };

  const modalStylesMain = {
    content: {
      top: '90px',
      width: '80vw',
      margin: '0 auto',
      height: 'max-content',
      maxHeight: '80vh',
    },
  };

  const closeModalPassword = () => {
    setModalPasswordIsOpen(false);
  };
  const modalPasswordContent = (
    <ChangePassword closeModal={closeModalPassword} showToast={showToast} />
  );

  const closeModalMain = () => {
    setModalMainIsOpen(false);
  };
  const modalMainContent = (
    <UserMainData closeModal={closeModalMain} showToast={showToast} />
  );

  const closeAddressEdit = () => {
    setModalAddressIsOpen(false);
  };

  const openModalPassword = () => {
    setModalPasswordIsOpen(true);
  };

  const openModalMain = () => {
    setModalMainIsOpen(true);
  };

  const modalAddressContent = (
    <EditAddress
      closeModal={closeAddressEdit}
      showToast={showToast}
      addressID={modalAddressID}
    />
  );
  const openAddressEdit = (addressID = '') => {
    setModalAddressID(addressID);
    setModalAddressIsOpen(true);
  };

  const clickDeleteAddress = async (addressID: string) => {
    const result = await deleteAddress(addressID);
    if (result.statusCode || !result.addresses) {
      const { message } = result;
      showToast({ message, thisError: true });
      return;
    }
    await getCustomerInfo(dispatch, true);
    showToast({
      message: 'Address deleted',
      thisError: false,
    });
  };

  // useEffect(() => {
  //   const appTokenStore = store.getState().userSlice.authToken.access_token;
  //   if (appTokenStore.length === 0) {
  //     // the next line leads to an infinite test
  //     // navigate(`/login`);
  //   }
  // });

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo(dispatch);

    if (userInfo.isError) {
      dispatch(logout());
      navigate(`/login`);
    } else {
      setUserData(userInfo.thing!);
    }
  };

  const dateToString = (date: string) => {
    const dateParts = date.split('-');
    return `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  };

  useEffect(() => {
    getUserInfo();
  });

  return (
    <>
      <Modal
        isOpen={modalMainIsOpen}
        onRequestClose={closeModalMain}
        style={modalStylesMain}
        ariaHideApp={false}
      >
        {modalMainContent}
      </Modal>

      <Modal
        isOpen={modalPasswordIsOpen}
        onRequestClose={closeModalPassword}
        style={modalStyles}
        ariaHideApp={false}
      >
        {modalPasswordContent}
      </Modal>

      <Modal
        isOpen={modalAddressIsOpen}
        onRequestClose={closeAddressEdit}
        style={modalStylesMain}
        ariaHideApp={false}
      >
        {modalAddressContent}
      </Modal>

      <div className="input-wrapper-header">
        <legend>Profile</legend>

        <button
          className="btn-show btn-password-edit"
          type="button"
          onClick={openModalPassword}
        >
          Change password
        </button>
      </div>

      <div className="form__profile form">
        <div className="form__profile profile-fieldset fieldset">
          <div className="input-wrapper-line">
            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="first Name"
              value={userData.firstName}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="last Name"
              value={userData.lastName}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="Date of Birth"
              value={dateToString(userData.dateOfBirth)}
            />

            <TextField
              classNameComponent="textfield-component"
              classNameTitle="textfield-title"
              classNameBody="textfield-body"
              title="Email"
              value={userData.email}
            />
          </div>
          <button className="btn-show" type="button" onClick={openModalMain}>
            Edit
          </button>
        </div>
      </div>
      <AddressesList
        onEditClick={openAddressEdit}
        onDeleteClick={clickDeleteAddress}
        userInfoProp={userData}
      />
    </>
  );
}

export default UserProfile;
