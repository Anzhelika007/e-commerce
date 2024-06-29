import { configureStore } from '@reduxjs/toolkit';

import userReducer from './userSlice';
import appReducer from './appSlice';
import cartReducer from './cartSlice';
import anonymousReducer from './anonymousSlice';
import discountReducer from './discountSlice';

const store = configureStore({
  reducer: {
    userSlice: userReducer,
    appSlice: appReducer,
    cartSlice: cartReducer,
    anonymousSlice: anonymousReducer,
    discountSlice: discountReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
