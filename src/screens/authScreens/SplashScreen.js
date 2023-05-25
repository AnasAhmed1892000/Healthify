import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Splash from "../../../redux/splach/SplashSlice";
import { SafeAreaView } from "react-native";
import Logo from "../../components/svgs/Logo";
import Background from "../../components/reusableComponents/Background";
//import User from '../../redux/user/LoginSlice';
const SplashScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    setTimeout(() => {
      dispatch(Splash.setIsSplashDone({}));
    }, 2500);
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
