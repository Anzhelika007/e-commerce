import store from '../../redux/store/store';
import { getAppToken } from './getAppToken';
import { getUserToken } from './getUserToken';

async function customerInfo(email: string, token: string) {
  const headers = new Headers({ Authorization: `Bearer ${token}` });
  const requestOptions = {
    method: 'GET',
    headers,
  };
  const searchString = encodeURIComponent(`email="${email}"`);
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers?limit=1&offset=0&where=${searchString}`,
    requestOptions
  );
  const answerJSON = await answer.json();
  return answerJSON;
}

export async function getCustomerInfo(update = false) {
  const userInfo = store.getState().userSlice.user;
  if (userInfo.email !== '' && !update) return userInfo;

  const appToken = await getAppToken();
  if (!appToken) return undefined;
  const userToken = await getUserToken();
  if (!userToken) return undefined;
  const result = await customerInfo(
    userToken.email.toLowerCase(),
    appToken.access_token
  );
  if (!result.total || result.results.length !== 1) return undefined;

  return result.results[0];
}

export default getCustomerInfo;
