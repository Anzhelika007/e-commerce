import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  validationSchemaMain,
  ValidationSchemaCall,
} from './userMainDataValidation';
import { useAppDispatch } from '../../../redux/hooks';
/* API */
import Input from '../elements/input';
import ButtonClose from '../elements/buttonClose';
import store from '../../../redux/store/store';
import { setAuthToken } from '../../../redux/store/userSlice';
import {
  ChangeUserMainData,
  changeUserMainData,
} from '../../../services/api/changeUserData';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';

type Props = {
  closeModal: () => void;
  showToast: ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => void;
};

function UserMainData({ closeModal, showToast }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationSchemaCall>({
    resolver: yupResolver(validationSchemaMain),
    mode: 'all',
  });

  // useEffect(() => {}, []);

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getCustomerInfo(dispatch);
      const dateParts = userInfo.thing!.dateOfBirth as unknown as Date;
      // console.log(dateParts);
      // const dateOfBirth = new Date(`${dateParts[0]}-${dateParts[1]}-${dateParts[2]}`);
      const defaultValues: ChangeUserMainData = {
        firstName: userInfo.thing!.firstName,
        lastName: userInfo.thing!.lastName,
        dateOfBirth: dateParts,
        email: userInfo.thing!.email,
      };
      reset({ ...defaultValues });
    };
    getUserInfo();
  }, [reset, dispatch]);

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = async (data: ChangeUserMainData) => {
    const result = await changeUserMainData(data);
    if (result.statusCode) {
      const { message } = result;
      showToast({ message, thisError: true });
    } else {
      const token = { ...store.getState().userSlice.authToken };
      token.email = data.email;
      dispatch(setAuthToken(token));
      await getCustomerInfo(dispatch, true);
      showToast({
        message: 'Changes saved',
        thisError: false,
      });
    }
    closeModal();
  };

  return (
    <>
      <ButtonClose id="buttonCloseMain" onClick={closeModal} />
      <div className="input-wrapper-header">
        <legend>Profile</legend>
      </div>
      <form className="form__profile form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper-line">
          <Input
            id="firstName"
            title="first Name"
            isRequired
            errorMessage={errors.firstName?.message}
            registerObject={register('firstName')}
          />

          <Input
            id="lastName"
            title="last Name"
            isRequired
            errorMessage={errors.lastName?.message}
            registerObject={register('lastName')}
          />

          <Input
            id="dateOfBirth"
            inputType="date"
            title="Date of Birth"
            isRequired
            errorMessage={errors.dateOfBirth?.message}
            registerObject={register('dateOfBirth')}
          />
        </div>

        <div className="input-wrapper-line">
          <Input
            id="email"
            classNameComponent="input-wrapper"
            title="Email"
            isRequired
            className="form__profile-email input-text"
            errorMessage={errors.email?.message}
            registerObject={register('email')}
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
    </>
  );
}

export default UserMainData;
