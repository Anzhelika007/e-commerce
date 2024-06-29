/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Address = {
  id?: string;
  streetName: string;
  postalCode: string;
  city: string;
  country: string;
  represent?: string;
  billing?: boolean;
  shipping?: boolean;
  billingDefault?: boolean;
  shippingDefault?: boolean;
};

export type User = {
  id: string;
  version: string;
  email: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  addresses: Array<Address>;
  defaultShippingAddressId: string;
  defaultBillingAddressId: string;
  shippingAddressIds: Array<string>;
  billingAddressIds: Array<string>;
};

export type AuthToken = {
  email: string;
  access_token: string;
  expires_in: number;
  token_type: string;
  scope: string;
  refresh_token: string;
};

type UserState = {
  user: User;
  authToken: AuthToken;
};

const someToken = localStorage.getItem('token');
let savedToken;
if (someToken) {
  savedToken = JSON.parse(someToken);
}

export const userInitial: User = {
  id: '',
  version: '',
  email: '',
  firstName: '',
  lastName: '',
  dateOfBirth: '',
  addresses: [],
  defaultShippingAddressId: '',
  defaultBillingAddressId: '',
  shippingAddressIds: [],
  billingAddressIds: [],
};

export const authTokenInitial: AuthToken = {
  email: '',
  access_token: '',
  expires_in: 0,
  token_type: '',
  scope: '',
  refresh_token: '',
};

const initialState: UserState = {
  user: userInitial,
  authToken: savedToken || authTokenInitial,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    setUserLogged(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    setAuthToken(state, action: PayloadAction<AuthToken>) {
      state.authToken = action.payload;
      localStorage.setItem('token', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = userInitial;
      state.authToken = authTokenInitial;
      localStorage.setItem('token', '');
    },
  },
});

export const { setUserLogged, setAuthToken, logout } = userSlice.actions;

export default userSlice.reducer;
