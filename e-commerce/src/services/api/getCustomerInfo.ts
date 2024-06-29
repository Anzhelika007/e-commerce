import store, { AppDispatch } from '../../redux/store/store';
import { User, setUserLogged } from '../../redux/store/userSlice';
import { AppMessage, getAppToken } from './getAppToken';
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
  )
    .then((data) => data.json())
    .then((data) => {
      if (data.errors || !data.total || data.results.length !== 1) {
        const result: AppMessage<User> = {
          isError: true,
          message: data.message,
        };
        return result;
      }
      const result: AppMessage<User> = {
        isError: false,
        thing: data.results[0],
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<User> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });

  return answer;
}

export async function getCustomerInfo(dispatch?: AppDispatch, update = false) {
  const userInfo = store.getState().userSlice.user;
  if (userInfo.email !== '' && !update) {
    const result: AppMessage<User> = {
      isError: false,
      thing: userInfo,
    };
    return result;
  }

  const appToken = await getAppToken(dispatch);
  if (appToken.isError) {
    const result: AppMessage<User> = {
      isError: true,
      message: appToken.message,
    };
    return result;
  }

  const userToken = await getUserToken();
  if (userToken.isError) {
    const result: AppMessage<User> = {
      isError: true,
      message: userToken.message,
    };
    return result;
  }

  const result = await customerInfo(
    userToken.thing!.email.toLowerCase(),
    appToken.thing!.access_token
  );
  if (!result.isError && result.thing && dispatch)
    dispatch(setUserLogged(result.thing));
  return result;
}

export default getCustomerInfo;
