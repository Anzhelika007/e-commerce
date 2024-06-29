/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Variant = {
  id: string;
  sku: string;
  images: { url: string }[];
  attributes: { name: string; value: string }[];
};

export type DiscountOnTotalPrice = {
  discountedAmount: TotalPrice;
  includedDiscounts: {
    discount: {
      typeId: string;
      id: string;
    };
  }[];
};

export type DiscountedPrice = {
  value: {
    centAmount: number;
    currencyCode: string;
  };
};

export type DiscountCode = {
  discountCode: {
    typeId: string;
    id: string;
  };
  state: string;
  code?: string;
};

export type Price = {
  value: {
    centAmount: number;
    currencyCode: string;
  };
  discounted: {
    value: {
      centAmount: number;
      currencyCode: string;
    };
  };
};

export type TotalPrice = {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
};

export type LineItem = {
  id: string;
  productId: string;
  name: { en: string };
  productType: string;
  variant: Variant;
  price: Price;
  quantity: number;
  totalPrice: TotalPrice;
  discountedPrice: DiscountedPrice;
  discountedPricePerQuantity: number;
};

export type Cart = {
  id: string;
  version: string;
  createdAt: string;
  lastModifiedAt: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: TotalPrice;
  discountOnTotalPrice: DiscountOnTotalPrice;
  discountCodes: DiscountCode[];
  origin: string;
  totalLineItemQuantity: number;
};

type CartState = {
  cart: Cart;
};

export const cartInitial: Cart = {
  id: '',
  version: '',
  createdAt: '',
  lastModifiedAt: '',
  lineItems: [],
  cartState: '',
  totalPrice: {
    type: '',
    currencyCode: '',
    centAmount: 0,
    fractionDigits: 0,
  },
  discountOnTotalPrice: {
    discountedAmount: {
      type: '',
      currencyCode: '',
      centAmount: 0,
      fractionDigits: 0,
    },
    includedDiscounts: [
      {
        discount: {
          typeId: '',
          id: '',
        },
      },
    ],
  },
  discountCodes: [],
  origin: '',
  totalLineItemQuantity: 0,
};

const initialState: CartState = {
  cart: { ...cartInitial },
};

const someTokenCart = localStorage.getItem('tokenCart');
if (someTokenCart) {
  const savedTokenCart = JSON.parse(someTokenCart);
  initialState.cart.id = savedTokenCart;
}

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState,
  reducers: {
    setCart(state, action: PayloadAction<Cart>) {
      state.cart = action.payload;
      // localStorage.setItem('tokenCart', JSON.stringify(action.payload.id));
    },
    clearCart(state) {
      // localStorage.setItem('tokenCart', '');
      state.cart = { ...cartInitial };
    },
  },
});

export const { setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
