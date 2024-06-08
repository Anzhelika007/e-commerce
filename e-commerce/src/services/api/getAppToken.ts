import store from '../../redux/store/store';
import { AppToken } from '../../redux/store/appSlice';

function formattedAppTokenNew(token: AppToken): AppToken {
  const result = { ...token };
  const currenDateValue = new Date().getTime() / 1000;
  result.expires_in = currenDateValue + token.expires_in;
  return result;
}

export async function createAccessToken() {
  const auth = btoa(
    `${import.meta.env.VITE_CTP_CLIENT_ID}:${import.meta.env.VITE_CTP_CLIENT_SECRET}`
  );
  const headers = new Headers({
    Authorization: `Basic ${auth}`,
  });
  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/token?grant_type=client_credentials&scope=${import.meta.env.VITE_CTP_SCOPES}`,
    {
      method: 'POST',
      headers,
    }
  );
  const answerJSON = await answer
    .json()
    .then((tokenNew) => formattedAppTokenNew(tokenNew));
  return answerJSON;
}

export async function getAppToken() {
  const currenDateValue = new Date().getTime() / 1000;
  const appTokenStore = store.getState().appSlice.authToken;
  if (
    appTokenStore.access_token &&
    appTokenStore.expires_in > currenDateValue
  ) {
    return appTokenStore;
  }

  const newToken = await createAccessToken();
  return newToken;
}
