import {
  IAddress,
  IAddressSend,
  IRegisterSend,
} from '../../types/User/Interface';
import { FormDataRegister } from '../../components/forms/validationRulesInput';
import { AppMessage, getAppToken } from './getAppToken';
import { AppDispatch } from '../../redux/store/store';
import { User, setUserLogged } from '../../redux/store/userSlice';
import { login } from './login';

async function register(customer: object, token: string) {
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/signup`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(customer),
    }
  )
    .then((NewUser) => NewUser.json())
    .then((NewUser) => {
      if (NewUser.errors) {
        const result: AppMessage<undefined> = {
          isError: true,
          message: NewUser.message,
        };
        return result;
      }
      const result: AppMessage<User> = {
        isError: false,
        thing: NewUser.customer,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<undefined> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });
  return answer;
}

function formattedDataAddress(data: IAddress): IAddressSend {
  const result = {
    streetName: data.streetName,
    city: data.city,
    country: data.country,
    postalCode: data.postalCode,
  };
  return result;
}

export function dateToStringForServerZone(date: Date): string {
  // 2010-10-23
  const year = `${date.getFullYear()}`;
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function formattedDataRegister(data: FormDataRegister): IRegisterSend {
  const addressShipping = formattedDataAddress(data.address);
  const addresses = [addressShipping];
  const addressInvoice = formattedDataAddress(data.addressInvoice);

  if (!data.addressForInvoice) {
    addresses.push(addressInvoice);
  }

  const formData: IRegisterSend = {
    email: data.email.toLowerCase(),
    password: data.password,
    firstName: data.firstName,
    lastName: data.lastName,
    dateOfBirth: dateToStringForServerZone(data.dateOfBirth),
    addresses,
    shippingAddresses: [0],
    billingAddresses: data.addressForInvoice ? [0] : [1],
  };

  if (data.address.default) {
    formData.defaultShippingAddress = 0;
  }
  if (data.addressInvoice.default) {
    formData.defaultBillingAddress = data.addressForInvoice ? 0 : 1;
  }
  return formData;
}

export async function registerNewCustomer(
  formData: FormDataRegister,
  dispatch: AppDispatch
) {
  const appToken = await getAppToken(dispatch);
  if (appToken.isError) return appToken;

  const dataUser = formattedDataRegister(formData);
  const newUser = await register(dataUser, appToken.thing!.access_token);
  if (newUser.isError) return newUser;

  const userToken = await login(formData, dispatch);
  if (userToken.isError) return userToken;

  if (newUser.thing) dispatch(setUserLogged(newUser.thing));

  return newUser;
}
