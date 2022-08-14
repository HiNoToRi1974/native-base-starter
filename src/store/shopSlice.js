import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  user: null,
  isAuth: false,
  accessToken: null,
  registerStep: 5,
};

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    shopStore: (state, action) => {
      state.user = action.payload.user;
      if (action.payload.register_step) {
        state.registerStep = action.payload.register_step;
      }
      (state.isAuth = true), (state.accessToken = action.payload.accessToken);
    },
  },
});

export const { shopStore } = shopSlice.actions;

export default shopSlice.reducer;
