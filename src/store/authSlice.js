import { createSlice } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
 
const initialState = {
  user: null,
  isAuth: false,
  accessToken: null,
  registerStep: 5,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginStore: (state, action) => {
      state.user = action.payload.user;
      if (action.payload.register_step) {
        state.registerStep = action.payload.register_step;
      }
      (state.isAuth = true), (state.accessToken = action.payload.accessToken);
    },
    logoutStore: (state) => {
      AsyncStorage.clear();
      state.user = null;
      (state.isAuth = false), (state.accessToken = null);
    },
  },
});

export const { loginStore, logoutStore, getToken } = authSlice.actions;

export default authSlice.reducer;
