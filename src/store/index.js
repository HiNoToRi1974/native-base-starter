import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./CounterSlice"
import authSlice from "./authSlice";
import shopSlice from "./shopSlice";
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authSlice,
    shops: shopSlice,
  },
});
