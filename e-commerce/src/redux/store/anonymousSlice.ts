/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthToken, authTokenInitial } from './userSlice';

type AnonymousState = {
  authToken: AuthToken;
};

const someToken = localStorage.getItem('anonymous');
let savedToken;
if (someToken) {
  savedToken = JSON.parse(someToken);
}

const initialState: AnonymousState = {
  authToken: savedToken || authTokenInitial,
};

const anonymousSlice = createSlice({
  name: 'anonymousSlice',
  initialState,
  reducers: {
    setAuthToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload;
      localStorage.setItem('anonymous', JSON.stringify(action.payload));
    },
    logout(state) {
      state.authToken = authTokenInitial;
      localStorage.setItem('anonymous', '');
    },
  },
});

export const { setAuthToken, logout } = anonymousSlice.actions;

export default anonymousSlice.reducer;
