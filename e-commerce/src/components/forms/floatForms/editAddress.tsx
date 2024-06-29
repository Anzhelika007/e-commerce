import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  ValidationSchemaAddress,
  ValidationAddressType,
} from './editAddressValidation';
import { useAppDispatch } from '../../../redux/hooks';
import { Address } from '../../../redux/store/userSlice';
import { getCustomerInfo } from '../../../services/api/getCustomerInfo';
import Input from '../elements/input';
import Country from '../elements/country';
import ButtonClose from '../elements/buttonClose';
import CheckBox from '../elements/checkBox';
/* API */
import {
  extractAddressesFromUser,
  addAddress,
  changeAddress,
} from '../../../services/api/changeAddresses';

type Props = {
  addressID?: string;
  closeModal: () => void;
  showToast: ({
    message,
    thisError,
  }: {
    message: string;
    thisError: boolean;
  }) => void;
};

export function EditAddress({ addressID, closeModal, showToast }: Props) {
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<ValidationAddressType>({
    resolver: yupResolver(ValidationSchemaAddress),
    mode: 'all',
  });

  useEffect(() => {
    const getUserInfo = async () => {
      const userInfo = await getCustomerInfo(dispatch);
      if (userInfo.isError) return;
      const userAddresses = extractAddressesFromUser(userInfo.thing!).addresses;
      if (!userAddresses) return;
      if (userAddresses.length === 0) return;
      const address = userAddresses.find((addr) => addr.id === addressID);
      if (!address) return;
      reset({ address });
    };
    if (addressID) getUserInfo();
  }, [reset, addressID, dispatch]);

  // Disable button submit
  useEffect(() => {
    setIsSubmitDisabled(!(isValid && isDirty));
  }, [isValid, isDirty]);

  const onSubmit = async (data: { address: Address }) => {
    let newAddressId = addressID;
    if (!addressID) {
      const result = await addAddress(data.address);
      if (result.statusCode || !result.addresses) {
        const { message } = result;
        showToast({ message, thisError: true });
        closeModal();
        return;
      }
      await getCustomerInfo(dispatch, true);
      newAddressId = result.addresses[result.addresses.length - 1].id;
    }
    const newAddress: Address = { ...data.address };
    newAddress.id = newAddressId;
    const changeAnswer = await changeAddress(newAddress);
    if (changeAnswer.statusCode || !changeAnswer.addresses) {
      const { message } = changeAnswer;
      showToast({ message, thisError: true });
      closeModal();
      return;
    }
    await getCustomerInfo(dispatch, true);
    showToast({
      message: 'Changes saved',
      thisError: false,
    });
    closeModal();
    // return data;
  };

  return (
    <>
      <ButtonClose id="buttonCloseMain" onClick={closeModal} />
      <div className="input-wrapper-header">
        <legend>Address</legend>
      </div>
      <form className="form__profile form" onSubmit={handleSubmit(onSubmit)}>
        <div className="input-wrapper-line-edit-address">
          <CheckBox
            id="addressForShipping"
            title="Use as shipping"
            registerObject={register('address.shipping')}
          />
          <CheckBox
            id="shippingDefault"
            title="Use as default"
            registerObject={register('address.shippingDefault')}
          />
        </div>
        <div className="input-wrapper-line-edit-address">
          <CheckBox
            id="addressForBilling"
            title="Use as billing"
            registerObject={register('address.billing')}
          />
          <CheckBox
            id="billingDefault"
            title="Use as default"
            registerObject={register('address.billingDefault')}
          />
        </div>

        <div className="input-wrapper-line-edit-address">
          <div className="registration-address">
            <Input
              id="streetName"
              classNameComponent="input-wrapper-address-edit"
              title="Street"
              isRequired
              className="form__profile-address input-text"
              errorMessage={errors.address?.streetName?.message}
              registerObject={register('address.streetName')}
            />

            <Input
              id="city"
              classNameComponent="input-wrapper-address-edit"
              title="City"
              isRequired
              className="form__profile-address input-text"
              errorMessage={errors.address?.city?.message}
              registerObject={register('address.city')}
            />

            <Country
              id="country"
              classNameComponent="input-wrapper-address-edit"
              isRequired
              className="form__profile-address input-text"
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
              id="postalCode"
              classNameComponent="input-wrapper-address-edit"
              title="POST Code"
              isRequired
              className="form__profile-address input-text"
              errorMessage={errors.address?.postalCode?.message}
              registerObject={register('address.postalCode')}
            />
          </div>
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

export default EditAddress;
