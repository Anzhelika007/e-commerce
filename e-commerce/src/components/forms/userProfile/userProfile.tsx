import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAppDispatch } from '../../../redux/hooks';
import {
  setUserLogged,
  User,
  setAuthToken,
  AuthToken,
  logout,
} from '../../../redux/store/userSlice';
import {
  validationSchemaRegister,
  FormDataRegister,
  placeholder,
} from '../validationRulesInput';
/* API */
import {
  registerNewCustomer,
  formattedDataRegister,
  loginCustomer,
} from '../../../services/api/getCustomerToken';
import store from '../../../redux/store/store';
import Input from '../elements/input';
import Password from '../elements/password';
import Country from '../elements/country';
import ButtonEdit from '../elements/buttonEdit';
import ChangePassword from '../floatForms/changePassword';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';

function UserProfile(): React.ReactElement {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const showToast = ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => {
    if (!thisError) {
      toast.success(message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'white',
          backgroundColor: 'green',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'green',
        },
      });
    } else {
      toast.error(message, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: 'red',
          backgroundColor: 'pink',
        },
        iconTheme: {
          primary: 'white',
          secondary: 'red',
        },
      });
    }
  };

  const [modalPasswordIsOpen, setModalPasswordIsOpen] = useState(false);
  // Modal.setAppElement('#root');

  const openModalPassword = () => {
    setModalPasswordIsOpen(true);
  };

  const closeModalPassword = () => {
    setModalPasswordIsOpen(false);
  };

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

  const modalPasswordContent = (
    <ChangePassword closeModal={closeModalPassword} showToast={showToast} />
  );

  useEffect(() => {
    const appTokenStore = store.getState().userSlice.authToken.access_token;
    if (appTokenStore.length === 0) {
      // the next line leads to an infinite test
      // navigate(`/login`);
    }
  });

  const setUserLogIn = (userNew: User) => {
    dispatch(setUserLogged(userNew));
  };

  const setAuthUserToken = (tokenNew: AuthToken) => {
    dispatch(setAuthToken(tokenNew));
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<FormDataRegister>({
    resolver: yupResolver(validationSchemaRegister),
    mode: 'all',
  });

  const getUserInfo = async () => {
    const userInfo = await getCustomerInfo();
    if (!userInfo) {
      dispatch(logout());
      navigate(`/login`);
    } else {
      // There are here is a date about customer
      dispatch(setUserLogged(userInfo));
      setValue('firstName', userInfo.firstName);
      setValue('lastName', userInfo.lastName);
      setValue('dateOfBirth', userInfo.dateOfBirth);
      setValue('email', userInfo.email);
      setValue('password', userInfo.password);
    }
  };

  useEffect(() => {
    getUserInfo();
  });

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  // Watch the checkbox for addressForInvoice
  const watchShowAddressInvoice = watch('addressForInvoice', false);

  // Watch the shipping address fields
  const watchShippingAddressStreet = watch('address.streetName', '');
  const watchShippingAddressCity = watch('address.city', '');
  const watchShippingAddressCountry = watch('address.country', '');
  const watchShippingAddressPostalCode = watch('address.postalCode', '');
  const watchAddressDefault = watch('address.default', false);

  // Sync invoice address with shipping address when checkbox is checked
  useEffect(() => {
    if (watchShowAddressInvoice) {
      setValue('addressInvoice.streetName', watchShippingAddressStreet);
      setValue('addressInvoice.city', watchShippingAddressCity);
      setValue('addressInvoice.country', watchShippingAddressCountry);
      setValue('addressInvoice.postalCode', watchShippingAddressPostalCode);
      setValue('addressInvoice.default', watchAddressDefault);
      trigger('address');
    }
  }, [
    watchShowAddressInvoice,
    watchShippingAddressStreet,
    watchShippingAddressCity,
    watchShippingAddressCountry,
    watchShippingAddressPostalCode,
    watchAddressDefault,
    setValue,
    trigger,
  ]);

  const onSubmit = async (data: FormDataRegister) => {
    const dataUser = formattedDataRegister(data);

    const userNew = await registerNewCustomer(dataUser);
    if (userNew.statusCode) {
      const { message } = userNew;
      const errorsBlock = document.getElementById('errorsAnswer');
      if (message && errorsBlock) {
        errorsBlock.innerText = message;
        setTimeout(() => {
          errorsBlock.innerText = '';
        }, 5000);
      }
    } else {
      setUserLogIn(userNew);

      const tokenNew = await loginCustomer(dataUser);

      if (tokenNew.statusCode) {
        const { message } = tokenNew;
        const errorsBlock = document.getElementById('errorsAnswer');
        if (message && errorsBlock) {
          errorsBlock.innerText = message;
          setTimeout(() => {
            errorsBlock.innerText = '';
          }, 5000);
        }
      } else {
        tokenNew.email = dataUser.email;
        setAuthUserToken(tokenNew);
        navigate(`/`);
      }
      return data;
    }
    return data;
  };

  return (
    <>
      <Modal
        isOpen={modalPasswordIsOpen}
        onRequestClose={closeModalPassword}
        style={modalStyles}
      >
        {modalPasswordContent}
      </Modal>
      <form
        className="form__registration form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <legend>Profile</legend>

        <div className="input-wrapper-line">
          <Input
            id="firstName"
            title="first Name"
            placeholder={placeholder.firstName}
            isRequared
            errorMessage={errors.firstName?.message}
            registerObject={register('firstName')}
          />

          <Input
            id="lastName"
            title="last Name"
            placeholder={placeholder.lastName}
            isRequared
            errorMessage={errors.lastName?.message}
            registerObject={register('lastName')}
          />

          <Input
            id="dateOfBirth"
            inputType="date"
            title="Date of Birth"
            isRequared
            errorMessage={errors.dateOfBirth?.message}
            registerObject={register('dateOfBirth')}
          />
        </div>

        <fieldset className="fieldset">
          Your addresses for shipping and billing
          <div className="input-wrapper-line">
            <div className="registration-adress">
              <Input
                id="address.streetName"
                classNameComponent="input-wrapper-address"
                title="Street"
                isRequared
                className="form__registration-adress input-text"
                errorMessage={errors.address?.streetName?.message}
                registerObject={register('address.streetName')}
              />

              <Input
                id="address.city"
                classNameComponent="input-wrapper-address"
                title="City"
                isRequared
                className="form__registration-adress input-text"
                errorMessage={errors.address?.city?.message}
                registerObject={register('address.city')}
              />

              <Country
                id="address.country"
                classNameComponent="input-wrapper-address"
                isRequared
                className="form__registration-adress input-text"
                errorMessage={errors.address?.country?.message}
                registerObject={register('address.country')}
                onChangeHandler={() =>
                  setValue('address.postalCode', '', {
                    shouldValidate: true,
                    shouldDirty: true,
                  })
                }
              />

              <Input
                id="address.postalCode"
                classNameComponent="input-wrapper-address"
                title="POST Code"
                isRequared
                className="form__registration-adress input-text"
                errorMessage={errors.address?.postalCode?.message}
                registerObject={register('address.postalCode')}
              />
            </div>
          </div>
        </fieldset>

        <div className="input-wrapper-line">
          <Input
            id="email"
            classNameComponent="input-wrapper"
            title="Email"
            isRequared
            className="form__registration-email input-text"
            errorMessage={errors.email?.message}
            registerObject={register('email')}
            disabled
          />

          <Password
            id="password"
            title="Password"
            isRequared
            className="form__registration-password input-text"
            errorMessage={errors.password?.message}
            after={
              <ButtonEdit id="buttonEditPassword" onClick={openModalPassword} />
            }
            registerObject={register('password')}
          />
        </div>

        <div className="input-wrapper-btn">
          <div className="input-error" id="errorsAnswer" />
          <button
            type="submit"
            className="btn-submit"
            disabled={isSubmitDisabled}
          >
            Save
          </button>
        </div>
      </form>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
}

export default UserProfile;
