import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSplashDone: false,
};
export const SplashSlice = createSlice({
  name: "splash",
  initialState,
  reducers: {
    setIsSplashDone: (state, actions) => {
      state.isSplashDone = true;
    },
  },
});
const Splash = {
  SplashSlice,
  setIsSplashDone: SplashSlice.actions.setIsSplashDone,
};
export const selectIsSplashDone = (state) => state.splash.isSplashDone;
export default Splash;
