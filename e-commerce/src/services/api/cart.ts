import { AppMessage } from './getAppToken';
import { getUserToken } from './getUserToken';
import { getAnonymousToken } from './getAnonymousToken';
import store, { AppDispatch } from '../../redux/store/store';
import { AuthToken } from '../../redux/store/userSlice';
import { Cart, setCart } from '../../redux/store/cartSlice';
// eslint-disable-next-line import/no-cycle
import { ProductCardProps } from '../../components/productCard/productCard';

const urlProject = `${import.meta.env.VITE_CTP_API_URL}/${import.meta.env.VITE_CTP_PROJECT_KEY}`;

// Create options for POST and GET (body=false)
async function requestOptions(
  token: AppMessage<AuthToken>,
  body: object | false = false
): Promise<RequestInit> {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token.thing?.access_token}`);

  const options: RequestInit = {
    method: body ? 'POST' : 'GET',
    headers: myHeaders,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  return options;
}

export async function createCart(token: AppMessage<AuthToken>) {
  const body = {
    currency: 'USD',
  };
  const options = await requestOptions(token, body);
  const resultFetch = await fetch(`${urlProject}/me/carts`, options)
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
  const url = new URL(`${urlProject}/me/carts`);
  url.searchParams.append('where', 'cartState="Active"');
  const options = await requestOptions(token);

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
}

export type UpdateAction = {
  action: string;
  productId?: string;
  lineItemId?: string;
  quantity?: number;
};

export type BodyUpdateAction = {
  version: string;
  actions: UpdateAction[];
};

export async function changeLineInCart(
  dispatch: AppDispatch,
  updateActions: UpdateAction[]
) {
  let userToken = await getUserToken();
  if (userToken.isError) {
    userToken = await getAnonymousToken(dispatch);
    if (userToken.isError) {
      return { isError: true, message: 'Action failed' };
    }
  }
  const existCart = await getCart(dispatch);
  if (existCart.isError) return { isError: true, message: 'Action failed' };

  const body = {
    version: existCart.thing!.version,
    actions: updateActions,
  };

  const options = await requestOptions(userToken, body);

  const answer = await fetch(
    `${urlProject}/me/carts/${existCart.thing?.id}`,
    options
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
        message: 'Successful',
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

export async function addLineToCart(dispatch: AppDispatch, productId: string) {
  const updateActions = new Array<UpdateAction>();
  const action = {
    action: 'addLineItem',
    productId,
    quantity: 1,
  };
  updateActions.push(action);
  const result = await changeLineInCart(dispatch, updateActions);
  if (result.isError) result.message = 'Failed to add item to cart';
  else result.message = 'Item added to cart';
  return result;
}

export async function substLineFromCart(
  dispatch: AppDispatch,
  lineItemId: string
) {
  const updateActions = new Array<UpdateAction>();
  const action = {
    action: 'removeLineItem',
    lineItemId,
    quantity: 1,
  };
  updateActions.push(action);
  const result = await changeLineInCart(dispatch, updateActions);
  return result;
}

export async function removeLineFromCart(
  dispatch: AppDispatch,
  lineItemId: string
) {
  const updateActions = new Array<UpdateAction>();
  const action = {
    action: 'removeLineItem',
    lineItemId,
  };
  updateActions.push(action);
  const result = await changeLineInCart(dispatch, updateActions);
  return result;
}

export async function clearCart(dispatch: AppDispatch) {
  const userCart = store.getState().cartSlice.cart;
  if (!userCart.id) {
    const result: AppMessage<Cart> = {
      isError: true,
      message: 'Something went wrong',
    };
    return result;
  }
  const updateActions = userCart.lineItems.map((line) => ({
    action: 'removeLineItem',
    lineItemId: line.id,
  }));
  const result = await changeLineInCart(dispatch, updateActions);
  if (!result.isError) {
    result.message = 'Emptying the Basket completed successfully';
  }
  return result;
}

export async function addDiscountCode(dispatch: AppDispatch, code: string) {
  const updateActions = new Array<UpdateAction>();
  const action = {
    action: 'addDiscountCode',
    code,
  };
  updateActions.push(action);
  const result = await changeLineInCart(dispatch, updateActions);
  return result;
}

export async function clearDiscountCode(dispatch: AppDispatch) {
  const userCart = store.getState().cartSlice.cart;
  if (!userCart.id || !userCart.discountCodes.length) {
    const result: AppMessage<Cart> = {
      isError: true,
      message: 'Discount cart not found',
    };
    return result;
  }
  // const updateActions = new Array<UpdateAction>();
  const updateActions = userCart.discountCodes.map((code) => {
    const result = {
      action: 'removeDiscountCode',
      discountCode: {
        typeId: 'discount-code',
        id: code.discountCode.id,
      },
    };
    return result;
  });
  const result = await changeLineInCart(dispatch, updateActions);
  return result;
}

export function checkProductsInCart(products: ProductCardProps[]) {
  const newProducts = products;
  const userCart = store.getState().cartSlice.cart;
  if (!userCart.id) {
    return newProducts;
  }
  newProducts.forEach((item, index) => {
    const itemInCart = userCart.lineItems.find(
      (line) => line.productId === item.id
    )?.quantity;
    if (itemInCart) newProducts[index].inBasket = true;
  });
  return newProducts;
}

export function checkProductInCartById(productId: string) {
  const userCart = store.getState().cartSlice.cart;

  const findProduct = userCart.lineItems.find((elem) => {
    if (elem.productId === productId) {
      return true;
    }
    return false;
  });
  if (findProduct) {
    return findProduct.id;
  }
  return '';
}

export function toFixedFormat(num: number, fractionDigits: number) {
  return num.toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  });
}

export function getProductCards(cart: Cart) {
  const productCards = cart.lineItems.map((product) => {
    const card = {
      lineId: product.id,
      id: product.productId,
      imageUrl: product.variant.images.map((img) => img.url),
      onSale: !!product.price.discounted,
      discounted: !!product.discountedPrice,
      title: product.name.en,
      newPrice: product.price.discounted
        ? `${toFixedFormat(product.price.discounted.value.centAmount / 100, 2)}`
        : `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      oldPrice: `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      salePrice: `${toFixedFormat(product.price.value.centAmount / 100, 2)}`,
      currency: product.price.value.currencyCode,
      quantity: product.quantity,
      fullPrice: `${product.totalPrice.currencyCode} ${toFixedFormat(product.totalPrice.centAmount / 100, 2)}`,
      // size: product.variant.attributes.find((attr) => attr.name === 'size')?.value,
      color: product.variant.attributes.find((attr) => attr.name === 'color')
        ?.value,
      model: product.variant.attributes.find((attr) => attr.name === 'model')
        ?.value,
    };
    if (product.discountedPrice) card.salePrice = card.newPrice;
    return card;
  });
  return productCards;
}

export default getCart;
