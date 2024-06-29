import { ILogin } from '../../types/User/Interface';
import { AppMessage } from './getAppToken';
import store, { AppDispatch } from '../../redux/store/store';
import {
  AuthToken,
  setAuthToken,
  logout as userLogout,
} from '../../redux/store/userSlice';
import { logout as anonymousLogout } from '../../redux/store/anonymousSlice';
import { Cart, setCart, clearCart } from '../../redux/store/cartSlice';
import { getCart } from './cart';

export async function mergeCart(
  formData: ILogin,
  cartID: string,
  accessToken: string
) {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${accessToken}`);

  const requestData = {
    email: formData.email.toLowerCase(),
    password: formData.password,
    anonymousCart: {
      id: cartID,
      typeId: 'cart',
    },
  };

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify(requestData),
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/login`,
    requestOptions
  )
    .then((response) => response.json())
    .then((response) => {
      if (response.errors) {
        const result: AppMessage<Cart> = {
          isError: true,
          message: response.message,
        };
        return result;
      }
      const result: AppMessage<Cart> = {
        isError: false,
        thing: response.cart,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<Cart> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });

  return answer;
}

export async function login(formData: ILogin, dispatch: AppDispatch) {
  const auth = btoa(
    `${import.meta.env.VITE_USR_CLIENT_ID}:${import.meta.env.VITE_USR_CLIENT_SECRET}`
  );
  const headers = new Headers();
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  headers.append('Authorization', `Basic ${auth}`);

  const body = new URLSearchParams();
  body.append('grant_type', 'password');
  body.append('username', formData.email.toLowerCase());
  body.append('password', formData.password);
  body.append('scope', import.meta.env.VITE_USR_SCOPES);

  const requestOptions = {
    method: 'POST',
    headers,
    body,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_AUTH_URL}/oauth/${import.meta.env.VITE_CTP_PROJECT_KEY}/customers/token`,
    requestOptions
  )
    .then((response) => response.json())
    .then((userToken) => {
      if (userToken.errors) {
        const result: AppMessage<undefined> = {
          isError: true,
          message: userToken.message,
        };
        return result;
      }
      const newToken = { ...userToken };
      const currentDateValue = new Date().getTime() / 1000;
      newToken.expires_in = currentDateValue + userToken.expires_in;
      newToken.email = formData.email;
      const result: AppMessage<AuthToken> = {
        isError: false,
        thing: newToken,
      };
      return result;
    })
    .catch((reason: Error) => {
      const result: AppMessage<undefined> = {
        isError: true,
        message: reason.message,
      };
      return result;
    });

  if (!answer.isError) {
    let mergeFull = false;
    dispatch(setAuthToken(answer.thing!));
    const anonymousCart = store.getState().cartSlice.cart;
    if (anonymousCart.id) {
      const anonymousToken = store.getState().anonymousSlice.authToken;
      if (anonymousToken.access_token) {
        const merged = await mergeCart(
          formData,
          anonymousCart.id,
          anonymousToken.access_token
        );
        if (!merged.isError) {
          mergeFull = true;
          dispatch(setCart(merged.thing!));
        }
      }
    }
    dispatch(anonymousLogout());
    if (!mergeFull) {
      dispatch(clearCart());
      getCart(dispatch);
    }
  }

  return answer;
}

export function logout(dispatch: AppDispatch) {
  dispatch(clearCart());
  dispatch(userLogout());
  dispatch(anonymousLogout());
}

export default login;
