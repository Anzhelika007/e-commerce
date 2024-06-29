import store, { AppDispatch } from '../../redux/store/store';
import { AppMessage } from './getAppToken';
import { AuthToken, authTokenInitial } from '../../redux/store/userSlice';
import { setAuthToken } from '../../redux/store/anonymousSlice';

export async function createAnonymousToken() {
  const scope = import.meta.env.VITE_USR_SCOPES;
  const auth = btoa(
    `${import.meta.env.VITE_USR_CLIENT_ID}:${import.meta.env.VITE_USR_CLIENT_SECRET}`
  );
  const headers = new Headers({
    Authorization: `Basic ${auth}`,
  });
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/anonymous/token?grant_type=client_credentials&scope=${scope}`,
    {
      method: 'POST',
      headers,
    }
  );
  const answerJSON = await answer
    .json()
    .then((tokenNew) => {
      if (tokenNew.errors) {
        const result: AppMessage<AuthToken> = {
          isError: true,
          message: tokenNew.message,
          thing: authTokenInitial,
        };
        return result;
      }
      const newToken = { ...tokenNew };
      const currentDateValue = new Date().getTime() / 1000;
      newToken.expires_in = currentDateValue + tokenNew.expires_in;

      const result: AppMessage<AuthToken> = {
        isError: false,
        thing: newToken,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<AuthToken> = {
        isError: true,
        message: reason.message,
        thing: authTokenInitial,
      };
      return result;
    });
  return answerJSON;
}

export async function getAnonymousToken(
  dispatch: AppDispatch,
  noCreate = false
) {
  const currentDateValue = new Date().getTime() / 1000;
  const tokenStore = store.getState().anonymousSlice.authToken;
  if (tokenStore.access_token && tokenStore.expires_in > currentDateValue) {
    const result: AppMessage<AuthToken> = {
      isError: false,
      thing: tokenStore,
    };
    return result;
  }

  if (noCreate) {
    const result: AppMessage<AuthToken> = {
      isError: true,
      message: 'Token not found',
      thing: authTokenInitial,
    };
    return result;
  }
  const newToken = await createAnonymousToken();
  if (!newToken.isError && newToken.thing) {
    dispatch(setAuthToken(newToken.thing));
  }
  return newToken;
}
