import { dateToStringForServerZone } from './register';
import { getCustomerInfo } from './getCustomerInfo';
import { getUserToken } from './getUserToken';
import { User, Address } from '../../redux/store/userSlice';

export type ChangeUserMainData = {
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
};

export type UpdateAction = {
  action?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string;
  addAddress?: Address;
  addressId?: string;
  address?: Address;
};

export type BodyUpdateAction = {
  version: string;
  actions: UpdateAction[];
};

export async function sendActions(body: BodyUpdateAction, token: string) {
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    }
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

function creatingMainActions(formData: ChangeUserMainData, user: User) {
  const updateActions = new Array<UpdateAction>();

  const dateOfBirth = dateToStringForServerZone(formData.dateOfBirth);
  const email = formData.email.toLowerCase();

  if (email !== user.email)
    updateActions.push({ action: 'changeEmail', email });
  if (formData.firstName !== user.firstName)
    updateActions.push({
      action: 'setFirstName',
      firstName: formData.firstName,
    });
  if (formData.lastName !== user.lastName)
    updateActions.push({ action: 'setLastName', lastName: formData.lastName });
  if (dateOfBirth !== user.dateOfBirth.slice(0, 10))
    updateActions.push({ action: 'setDateOfBirth', dateOfBirth });

  return updateActions;
}

export async function changeUserMainData(formData: ChangeUserMainData) {
  const user = await getCustomerInfo();
  if (user.isError) return { statusCode: 'err', message: 'save failed' };

  const updateActions = creatingMainActions(formData, user.thing!);
  if (updateActions.length === 0)
    return { statusCode: 'err', message: 'No changes nothing to save' };

  const userToken = await getUserToken();
  if (userToken.isError) return { statusCode: 'err', message: 'save failed' };

  const body = {
    version: user.thing!.version,
    actions: updateActions,
  };

  const answer = sendActions(body, userToken.thing!.access_token);

  return answer;
}

export default changeUserMainData;
