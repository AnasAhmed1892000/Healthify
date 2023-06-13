import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect, useState } from "react";
import AuthStack from "./authStack";
import AppStack from "./appStack";
import { selectIsSplashDone } from "../../redux/splach/SplashSlice";
// import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import SplashScreen from "../screens/authScreens/SplashScreen";
import { selectCurrentUser } from "../../redux/user/LoginSlice";
// import { selectToken } from "../redux/user/LoginSlice";
import Login from "../../redux/user/LoginSlice";
// import { useAppDispatch } from "../redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DoctorStack from "./doctorStack";
import axios from "axios";
import Splash from "../../redux/splach/SplashSlice";
import { selectRole } from "../../redux/user/userSlice";
import user from "../../redux/user/userSlice";
const NavigationHandler = () => {
  const dispatch = useDispatch();
  const [Response, setResponse] = useState({});
  const currentUserCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      var config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://healthify-103r.onrender.com/api/v1/users/ReOpenApp",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await axios(config);
        if (response.data.status == "success") {
          setResponse(response.data);
          if (response.data.patient) {
            console.log(response.data.patient);
            dispatch(user.setRole("patient"));
            dispatch(Splash.setIsSplashDone(true));
          } else if (response.data.doctor) {
            dispatch(user.setRole("doctor"));
            dispatch(Splash.setIsSplashDone(true));
          }
        }

        dispatch(Login.setCurrentUser(true));
      } catch (error) {
        console.log(error.message);
        alert(error.message);
        dispatch(Splash.setIsSplashDone(true));
      }
    } else {
      dispatch(Login.setCurrentUser(false));
      dispatch(Splash.setIsSplashDone(true));
    }
  };

  const isSplashDone = useSelector(selectIsSplashDone);
  const currentUser = useSelector(selectCurrentUser);
  const role = useSelector(selectRole);
  const renderSwitch = useCallback(() => {
    if (!isSplashDone) {
      return <SplashScreen />;
    }
    if (!currentUser) {
      dispatch(Splash.setIsSplashDone(true));
      console.log("true");
      return <AuthStack />;
    }
    if (currentUser) {
      dispatch(Splash.setIsSplashDone(true));

      if (role == "doctor") {
        return <DoctorStack />;
      } else if (role == "patient") {
        return <AppStack />;
      }
    }
  }, [currentUser, isSplashDone, role]);

  useEffect(() => {
    currentUserCheck();
    renderSwitch();
  }, []);
  return (
    /*<SafeAreaProvider
      style={{
        paddingTop: Platform.OS === 'ios' ? 35 : 0,
        paddingBottom: Platform.OS === 'ios' ? 20 : 0,
      }}>*/
    <NavigationContainer>{renderSwitch()}</NavigationContainer>
    //</SafeAreaProvider>
  );
};
export default NavigationHandler;
