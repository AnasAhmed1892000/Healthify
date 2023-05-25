import {
  Text,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  Image,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles";
import COLORS from "../../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../../values/dimensions";
import Logo from "../../../components/svgs/Logo";
import Background from "../../../components/reusableComponents/Background";
import { Font } from "expo";
import InputView from "../../../components/reusableComponents/InputView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Login from "../../../../redux/user/LoginSlice";
import axios from "axios";
import Loading from "../../../../redux/loading/LoadingSlice";
import { selectIsLoading } from "../../../../redux/loading/LoadingSlice";
/*
 */

const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: Yup.string()
    .required("Required")
    .min(6, "Password must be at least 6 char"),
});
const initialValues = {
  email: "",
  password: "",
};
const LoginScreen = () => {
  const [responce, setResponce] = useState();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const select = useSelector;
  const userSignIn = async (email, password) => {
    dispatch(Loading.setLoading(true));
    var data = {
      email: email,
      password: password,
    };
    var config = {
      method: "post",
      url: "https://healthify-103r.onrender.com/api/v1/users/login",
      data: data,
    };
    try {
      const response = await axios(config);
      dispatch(Loading.setLoading(true));
      if (response.data.status == "success") {
        dispatch(Loading.setLoading(false));
        dispatch(Login.setCurrentUser(true));
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("id", response.data.data.user._id);
      }
    } catch (error) {
      console.log(error.message);

      dispatch(Loading.setLoading(false));
      dispatch(Login.setCurrentUser(false));
      if (error.message.includes("401")) {
        // Display an error message to the user using an alert or a toast message
        alert("Invalid email or password. Please try again.");
      } else {
        alert("Something went wrong please try agian later ");
      }
    }
  };

  return (
    <ImageBackground
      source={require("../../../components/assets/IMG_6142.png")}
      style={{
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center",
        paddingTop: MarginsAndPaddings.l,
      }}
    >
      <View style={styles.container}>
        <Formik
          validationSchema={loginValidationSchema}
          initialValues={initialValues}
          onSubmit={(values) => userSignIn(values.email, values.password)}
        >
          {(props) => {
            return (
              <View>
                <View style={styles.logo}>
                  <Logo width={"250.000000pt"} height={"250.000000pt"} />
                  <View
                    style={{
                      marginTop: -50,
                      marginLeft: MarginsAndPaddings.xs,
                    }}
                  >
                    <Text style={{ fontSize: 20, fontWeight: "500" }}>
                      Sign in to your account now
                    </Text>
                  </View>

                  <InputView
                    {...props}
                    name="email"
                    placeholder={"Enter Your Email"}
                    title=""
                    handelChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  <InputView
                    {...props}
                    name="password"
                    placeholder={"Enter Your Password"}
                    title=""
                    handelChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  <View>
                    <TouchableOpacity
                      style={{
                        justifyContent: "center",
                        width: 297,
                        height: 54,
                        backgroundColor: COLORS.mianBlue,
                        marginTop: MarginsAndPaddings.xl,
                        marginLeft: -28,
                        borderRadius: BorderRadius.xl,
                      }}
                      activeOpacity={0.7}
                      onPress={() => props.handleSubmit()}
                      disabled={!props.dirty || !props.isValid}
                    >
                      <View
                        style={{
                          flex: 1,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: COLORS.white,
                            fontSize: 18,
                            fontWeight: "600",
                          }}
                        >
                          Log in
                        </Text>
                      </View>
                    </TouchableOpacity>

                    {select(selectIsLoading) ? (
                      <View style={{ marginTop: MarginsAndPaddings.s }}>
                        <ActivityIndicator
                          size="large"
                          color={COLORS.mianBlue}
                        />
                      </View>
                    ) : null}

                    <TouchableOpacity
                      style={{
                        alignItems: "flex-end",
                        marginTop: 15,
                      }}
                      onPress={() => navigation.navigate("ForgetPassword1")}
                    >
                      <Text
                        style={{
                          color: COLORS.blue,
                        }}
                      >
                        Forgot Password ?
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.line}>
                    <View style={styles.fLine} />
                    <Text
                      style={{
                        color: "#000",
                        marginHorizontal: 20,
                        fontSize: 13,
                      }}
                    >
                      Or continue with
                    </Text>
                    <View style={styles.fLine} />
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      width: "75%",
                      marginTop: 15,
                      paddingRight: 15,
                    }}
                  >
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 45,
                          height: 45,
                        }}
                        source={require("../../../components/assets/google-plus.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 45,
                          height: 45,
                        }}
                        source={require("../../../components/assets/facebook.png")}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity>
                      <Image
                        style={{
                          width: 45,
                          height: 45,
                        }}
                        source={require("../../../components/assets/twitter.png")}
                      />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      marginTop: 50,
                      marginLeft: 35,
                    }}
                  >
                    <Text style={{ fontSize: 15 }}>Don't have account ?</Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: 5,
                      }}
                      onPress={() => navigation.navigate("SignUp")}
                    >
                      <Text style={{ color: COLORS.blue, fontSize: 15 }}>
                        Sign Up
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;
