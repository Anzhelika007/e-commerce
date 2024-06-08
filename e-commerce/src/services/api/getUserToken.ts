import store from '../../redux/store/store';

export async function getUserToken() {
  const currentDateValue = new Date().getTime() / 1000;
  const userTokenStore = store.getState().userSlice.authToken;
  if (userTokenStore.access_token) {
    if (userTokenStore.expires_in > currentDateValue) {
      return userTokenStore;
    }
    // ToDo: There are need to be use refresh token
    return undefined;
  }

  return undefined;
}

export default getUserToken;
