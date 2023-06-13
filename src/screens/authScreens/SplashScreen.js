import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Splash from "../../../redux/splach/SplashSlice";
import { SafeAreaView } from "react-native";
import Logo from "../../components/svgs/Logo";
import Background from "../../components/reusableComponents/Background";

import Login from "../../../redux/user/LoginSlice";
// import { useAppDispatch } from "../redux/Store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import DoctorStack from "../../navigation/doctorStack";
import axios from "axios";
const SplashScreen = () => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   setTimeout(() => {
  //     dispatch(Splash.setIsSplashDone(true));
  //   }, 2500);
  // }, []);
  const currentUserCheck = async () => {
    const token = await AsyncStorage.getItem("token");
    console.log(token);
    token != null
      ? dispatch(Login.setCurrentUser(true))
      : dispatch(Login.setCurrentUser(false));
    // var config = {
    //   method: "get",
    //   maxBodyLength: Infinity,
    //   url: "https://healthify-103r.onrender.com/api/v1/users/ReOpenApp",
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // try {
    //   const response = await axios(config);
    //   if (response.data.status == "success") {
    //     setResponse(response.data);
    //     console.log(Response.photo);
    //   }
    // } catch (error) {
    //   console.log(error.message);
    //   alert(error.message);
    // }
  };
  useEffect(() => {
    currentUserCheck();
  }, []);
  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          position: "absolute",
          top: 50,
          left: 35,
        }}
      >
        <ImageBackground style={{ opacity: 0.3 }}>
          <Background />
        </ImageBackground>
        <View
          style={{
            position: "absolute",
            top: 150,
            zIndex: 999,
          }}
        >
          <Logo width={"350.000000pt"} height={"350.000000pt"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({});
