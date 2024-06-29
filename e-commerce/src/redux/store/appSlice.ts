/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AppToken = {
  access_token: string;
  token_type: string;
  expires_in: number;
  scope: string;
};

type AppState = {
  authToken: AppToken;
};

const initialToken: AppToken = {
  access_token: '',
  token_type: '',
  expires_in: 0,
  scope: '',
};

const initialState: AppState = {
  authToken: { ...initialToken },
};

const appSlice = createSlice({
  name: 'appSlice',
  initialState,
  reducers: {
    setAppToken(state, action: PayloadAction<AppToken>) {
      state.authToken = action.payload;
    },
    setAppAccessToken(state, action: PayloadAction<string>) {
      state.authToken.access_token = action.payload;
    },
  },
});

export const { setAppToken, setAppAccessToken } = appSlice.actions;

export default appSlice.reducer;
