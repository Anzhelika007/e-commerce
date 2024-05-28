import { IAddress, IAddressSend, IRegisterSend } from './Inreface';
import { FormDataRegister } from '../../components/forms/validationRulesInput';
import { getAppToken } from './getAppToken';

export async function register(customer: object, token: string) {
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
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

export async function registerNewCustomer(formData: IRegisterSend) {
  const answer = getAppToken().then((result) =>
    register(formData, result.access_token)
  );

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
    dateOfBirth: data.dateOfBirth.toISOString().slice(0, 10),
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
