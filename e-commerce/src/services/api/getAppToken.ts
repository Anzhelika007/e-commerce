import store, { AppDispatch } from '../../redux/store/store';
import { AppToken, setAppToken } from '../../redux/store/appSlice';

export function formattedAppTokenNew(token: AppToken): AppToken {
  const result = { ...token };
  const currentDateValue = new Date().getTime() / 1000;
  result.expires_in = currentDateValue + token.expires_in;
  return result;
}

export type AppMessage<Thing> = {
  isError: boolean;
  message?: string;
  thing?: Thing;
};

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
  )
    .then((tokenNew) => tokenNew.json())
    .then((tokenNew) => {
      if (tokenNew.errors) {
        const result: AppMessage<AppToken> = {
          isError: true,
          message: tokenNew.message,
        };
        return result;
      }
      const result: AppMessage<AppToken> = {
        isError: false,
        thing: formattedAppTokenNew(tokenNew),
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<AppToken> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });
  return answer;
}

export async function getAppToken(dispatch?: AppDispatch) {
  const currentDateValue = new Date().getTime() / 1000;
  const appTokenStore = store.getState().appSlice.authToken;
  if (
    appTokenStore.access_token &&
    appTokenStore.expires_in > currentDateValue
  ) {
    const result: AppMessage<AppToken> = {
      isError: false,
      thing: formattedAppTokenNew(appTokenStore),
    };
    return result;
  }

  const newToken = await createAccessToken();
  if (!newToken.isError && newToken.thing && dispatch)
    dispatch(setAppToken(newToken.thing));

  return newToken;
}
