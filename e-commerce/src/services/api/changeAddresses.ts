import { getCustomerInfo } from './getCustomerInfo';
import { getUserToken } from './getUserToken';
import { User, Address } from '../../redux/store/userSlice';
import { UpdateAction, sendActions } from './changeUserData';

export type UserAddresses = {
  defaultBilling?: Address;
  defaultShipping?: Address;
  addresses?: Array<Address>;
};

export function extractAddressesFromUser(userInfo: User) {
  const userAddresses: UserAddresses = {};

  const addr = userInfo.addresses.map((address) => {
    const newAddress: Address = { ...address };
    newAddress.represent = `${newAddress.country}, ${newAddress.postalCode} ${newAddress.city}, ${newAddress.streetName}`;
    newAddress.billing = false;
    newAddress.billingDefault = false;
    newAddress.shipping = false;
    newAddress.shippingDefault = false;
    return newAddress;
  });
  if (userInfo.defaultBillingAddressId) {
    const defBilling = addr.find(
      (item) => item.id === userInfo.defaultBillingAddressId
    );
    if (defBilling) {
      defBilling.billingDefault = true;
      userAddresses.defaultBilling = defBilling;
    }
  }
  if (userInfo.defaultShippingAddressId) {
    const defShipping = addr.find(
      (item) => item.id === userInfo.defaultShippingAddressId
    );
    if (defShipping) {
      defShipping.shippingDefault = true;
      userAddresses.defaultShipping = defShipping;
    }
  }
  userInfo.billingAddressIds.forEach((id) => {
    const billing = addr.find((item) => item.id === id);
    if (billing) billing.billing = true;
  });
  userInfo.shippingAddressIds.forEach((id) => {
    const shipping = addr.find((item) => item.id === id);
    if (shipping) shipping.shipping = true;
  });
  addr.sort((a, b) => {
    if (a.billingDefault || a.shippingDefault) return -1;
    if (b.billingDefault || b.shippingDefault) return 1;
    return 0;
  });
  userAddresses.addresses = addr;
  return userAddresses;
}

function creatingAddressActions(data: Address, user: User) {
  const formData = data;

  const updateActions = new Array<UpdateAction>();

  const userAddresses = extractAddressesFromUser(user).addresses;
  if (!userAddresses) return updateActions;
  if (userAddresses.length === 0) return updateActions;
  const userAddress = userAddresses.find(
    (address) => address.id === formData.id
  );
  if (!userAddress) return updateActions;

  if (formData.billingDefault) formData.billing = true;
  if (formData.billing !== userAddress.billing) {
    updateActions.push({
      action: formData.billing
        ? 'addBillingAddressId'
        : 'removeBillingAddressId',
      addressId: formData.id,
    });
  }
  if (formData.billingDefault !== userAddress.billingDefault) {
    updateActions.push({
      action: 'setDefaultBillingAddress',
      addressId: formData.billingDefault ? formData.id : undefined,
    });
  }

  if (formData.shippingDefault) formData.shipping = true;
  if (formData.shipping !== userAddress.shipping) {
    updateActions.push({
      action: formData.shipping
        ? 'addShippingAddressId'
        : 'removeShippingAddressId',
      addressId: formData.id,
    });
  }
  if (formData.shippingDefault !== userAddress.shippingDefault) {
    updateActions.push({
      action: 'setDefaultShippingAddress',
      addressId: formData.shippingDefault ? formData.id : undefined,
    });
  }

  let needUpdate = formData.country !== userAddress.country;
  needUpdate = needUpdate || formData.city !== userAddress.city;
  needUpdate = needUpdate || formData.postalCode !== userAddress.postalCode;
  needUpdate = needUpdate || formData.streetName !== userAddress.streetName;
  if (needUpdate) {
    updateActions.push({
      action: 'changeAddress',
      addressId: formData.id,
      address: {
        country: formData.country,
        city: formData.city,
        postalCode: formData.postalCode,
        streetName: formData.streetName,
      },
    });
  }

  return updateActions;
}

export async function addAddress(formData: Address) {
  const user = await getCustomerInfo();
  if (user.isError) return { statusCode: 'err', message: 'save failed' };

  const userToken = await getUserToken();
  if (userToken.isError) return { statusCode: 'err', message: 'save failed' };

  const updateActions = [
    {
      action: 'addAddress',
      address: formData,
    },
  ];

  const body = {
    version: user.thing!.version,
    actions: updateActions,
  };

  const answer = sendActions(body, userToken.thing!.access_token);

  return answer;
}

export async function deleteAddress(addressID: string) {
  const user = await getCustomerInfo();
  if (!user) return { statusCode: 'err', message: 'save failed' };

  const userToken = await getUserToken();
  if (!userToken) return { statusCode: 'err', message: 'save failed' };

  const updateActions = [
    {
      action: 'removeAddress',
      addressId: addressID,
    },
  ];

  const body = {
    version: user.thing!.version,
    actions: updateActions,
  };

  const answer = sendActions(body, userToken.thing!.access_token);

  return answer;
}

export async function changeAddress(formData: Address) {
  const user = await getCustomerInfo();
  if (!user) return { statusCode: 'err', message: 'save failed' };

  const updateActions = creatingAddressActions(formData, user.thing!);
  if (updateActions.length === 0)
    return { statusCode: 'err', message: 'No changes nothing to save' };

  const userToken = await getUserToken();
  if (!userToken) return { statusCode: 'err', message: 'save failed' };

  const body = {
    version: user.thing!.version,
    actions: updateActions,
  };

  const answer = sendActions(body, userToken.thing!.access_token);

  return answer;
}

export default addAddress;
