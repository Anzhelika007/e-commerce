import store from '../../redux/store/store';
import { AuthToken, authTokenInitial } from '../../redux/store/userSlice';
import { AppMessage } from './getAppToken';

export async function getUserToken() {
  const currentDateValue = new Date().getTime() / 1000;
  const userTokenStore = store.getState().userSlice.authToken;
  if (userTokenStore.access_token) {
    if (userTokenStore.expires_in > currentDateValue) {
      const result: AppMessage<AuthToken> = {
        isError: false,
        thing: userTokenStore,
      };
      return result;
    }
    // ToDo: There are need to be use refresh token
    // return undefined;
  }

  const result: AppMessage<AuthToken> = {
    isError: true,
    message: 'Failed to get user token',
    thing: authTokenInitial,
  };
  return result;
}

export default getUserToken;
