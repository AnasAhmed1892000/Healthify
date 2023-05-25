import Splash from "./splach/SplashSlice";
import { combineReducers } from "@reduxjs/toolkit";
import Login from "./user/LoginSlice";
import Loading from "./loading/LoadingSlice";
import search from "./search/searchSlice";
import user from "./user/userSlice";
import time from "./appointment/TimeSlice";
import image from "./image/imageSlice";
import BMI from "./bmi/BMISlice";
const rootReducer = combineReducers({
  splash: Splash.SplashSlice.reducer,
  login: Login.LoginSlice.reducer,
  loading: Loading.LoadingSlice.reducer,
  search: search.SearchSlice.reducer,
  user: user.userSlice.reducer,
  time: time.TimeSlice.reducer,
  image: image.imageSlice.reducer,
  bmi: BMI.BMISlice.reducer,
});
export default rootReducer;
