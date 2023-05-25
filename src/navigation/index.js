import { useSelector, useDispatch } from "react-redux";
import React, { useCallback, useEffect } from "react";
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

const NavigationHandler = () => {
  const dispatch = useDispatch();
  const currentUserCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    token != null
      ? dispatch(Login.setCurrentUser(true))
      : dispatch(Login.setCurrentUser(false));
  };
  useEffect(() => {
    currentUserCheck();
  }, []);
  const isSplashDone = useSelector(selectIsSplashDone);
  const currentUser = useSelector(selectCurrentUser);
  const renderSwitch = useCallback(() => {
    if (!isSplashDone) return <SplashScreen />;
    if (!currentUser) {
      return <AuthStack />;
    } else {
      return <AppStack />;
    }
  }, [currentUser, isSplashDone]);
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
