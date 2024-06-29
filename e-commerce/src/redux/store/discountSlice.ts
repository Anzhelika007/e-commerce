/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type DiscountCode = {
  id: string;
  version: number;
  code: string;
  name: {
    en: string;
  };
  description: {
    en: string;
  };
  cartDiscounts: [
    {
      typeId: string;
      id: string;
    },
  ];
  isActive: boolean;
  cartPredicate: string;
};

export type DiscountCodes = {
  discountCodes: DiscountCode[];
};

const initialState: DiscountCodes = {
  discountCodes: [],
};

const appSlice = createSlice({
  name: 'discountSlice',
  initialState,
  reducers: {
    setCodes(state, action: PayloadAction<DiscountCode[]>) {
      state.discountCodes = action.payload;
    },
  },
});

export const { setCodes } = appSlice.actions;

export default appSlice.reducer;
