import { AppMessage } from './getAppToken';
import { getUserToken } from './getUserToken';
import { getAnonymousToken } from './getAnonymousToken';
import store, { AppDispatch } from '../../redux/store/store';
import { AuthToken } from '../../redux/store/userSlice';
import { Cart, setCart } from '../../redux/store/cartSlice';
// import { ProductCardProps } from '../../components/productCard/productCard';

export async function createCart(token: AppMessage<AuthToken>) {
  const body = {
    currency: 'USD',
  };
  const resultFetch = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token.thing?.access_token}`,
      },
      body: JSON.stringify(body),
    }
  )
    .then((answer) => answer.json())
    .then((answer) => {
      if (answer.errors) {
        const result: AppMessage<Cart> = {
          isError: true,
          message: answer.message,
        };
        return result;
      }
      const result: AppMessage<Cart> = {
        isError: false,
        thing: answer,
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
  return resultFetch;
}

export async function findExistingCustomerCart(token: AppMessage<AuthToken>) {
  const url = new URL(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts`
  );
  url.searchParams.append('where', 'cartState="Active"');
  const options = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.thing?.access_token}`,
    },
  };

  const resultFetch = await fetch(url.toString(), options)
    .then((answer) => answer.json())
    .then((answer) => {
      if (answer.errors) {
        const result: AppMessage<Cart> = {
          isError: true,
          message: answer.message,
        };
        return result;
      }
      if (answer.total === 0) {
        const result: AppMessage<Cart> = {
          isError: true,
          message: 'Cart not found',
        };
        return result;
      }
      const lastCart = answer.results.reduce((res: Cart, cart: Cart) => {
        if (cart.lastModifiedAt > res.lastModifiedAt) return cart;
        return res;
      });
      const result: AppMessage<Cart> = {
        isError: false,
        thing: lastCart,
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
  return resultFetch;
}

export async function getUserCart(
  dispatch: AppDispatch,
  token: AppMessage<AuthToken>
) {
  const userCart = store.getState().cartSlice.cart;
  if (userCart.id) {
    const result: AppMessage<Cart> = {
      isError: false,
      thing: userCart,
    };
    return result;
  }

  const existsCart = await findExistingCustomerCart(token);
  if (!existsCart.isError) {
    dispatch(setCart(existsCart.thing!));
    return existsCart;
  }
  const newCart = await createCart(token);
  if (!newCart.isError) {
    dispatch(setCart(newCart.thing!));
  }
  return newCart;
}

export async function getCart(dispatch: AppDispatch) {
  let userToken = await getUserToken();
  if (userToken.isError) {
    userToken = await getAnonymousToken(dispatch);
  }
  if (userToken.isError) {
    const result: AppMessage<Cart> = {
      isError: true,
      message: userToken.message,
    };
    return result;
  }

  const existCart = getUserCart(dispatch, userToken);

  return existCart;
  // }
}

function creatingActionAdd(productId: string) {
  const updateActions = {
    action: 'addLineItem',
    productId,
  };
  return updateActions;
}

export type UpdateAction = {
  action: string;
  productId: string;
};

export type BodyUpdateAction = {
  version: string;
  actions: UpdateAction[];
};

export async function addLineToCart(dispatch: AppDispatch, productId: string) {
  let userToken = await getUserToken();
  if (userToken.isError) {
    userToken = await getAnonymousToken(dispatch);
    if (userToken.isError) {
      return { statusCode: 'err', message: 'Action failed' };
    }
  }
  const existCart = await getCart(dispatch);
  if (existCart.isError) return { statusCode: 'err', message: 'Action failed' };

  const updateActions = new Array<UpdateAction>();
  updateActions.push(creatingActionAdd(productId));

  const body = {
    version: existCart.thing!.version,
    actions: updateActions,
  };

  const answer = await fetch(
    `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}/me/carts/${existCart.thing?.id}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken.thing?.access_token}`,
      },
      body: JSON.stringify(body),
    }
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
        thing: response,
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

  if (!answer.isError) dispatch(setCart(answer.thing!));

  return answer;
}

export default getCart;