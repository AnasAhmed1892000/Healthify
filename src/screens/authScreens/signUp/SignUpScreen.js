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
  Platform,
} from "react-native";
import React from "react";
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

const SignupValidationSchema = Yup.object().shape({
  name: Yup.string().required("Email Address is Required"),
  phone_number: Yup.string().required("Phone number is required"),
  email: Yup.string()
    .email("Please enter valid email")
    .required("Email Address is Required"),
  password: Yup.string()
    .required("Required")
    .min(8, "Password must be at least 8 char"),
  passwordConfirm: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
const initialValues = {
  name: "",
  email: "",
  password: "",
  passwordConfirm: "",
  phone_number: "",
};
const SignUpScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const select = useSelector;
  const UserSignUp = async (
    name,
    email,
    password,
    passwordConfirm,
    phone_number
  ) => {
    console.log("first");
    dispatch(Loading.setLoading(true));
    var data = JSON.stringify({
      name: name,
      email: email,
      password: password,
      passwordConfirm: passwordConfirm,
      phone_number: phone_number,
    });
    console.log(data);
    var config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/users/signup",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    };
    try {
      const response = await axios(config);
      dispatch(Loading.setLoading(true));
      if (response.data.status == "success") {
        dispatch(Loading.setLoading(false));
        dispatch(Login.setCurrentUser(true));
        console.log(response.data);
        await AsyncStorage.setItem("token", response.data.token);
        await AsyncStorage.setItem("id", response.data.data.user._id);
      }
    } catch (error) {
      console.log(error.message);

      dispatch(Loading.setLoading(false));
      dispatch(Login.setCurrentUser(false));
      if (error.message.includes("400")) {
        // Display an error message to the user using an alert or a toast message
        alert("This email address already exists");
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
      <ScrollView style={styles.container}>
        <Formik
          validationSchema={SignupValidationSchema}
          initialValues={initialValues}
          onSubmit={
            (values) =>
              UserSignUp(
                values.name,
                values.email,
                values.password,
                values.passwordConfirm,
                values.phone_number
              )
            // **place for api request**
          }
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
                      Create to your account now
                    </Text>
                  </View>
                  <InputView
                    {...props}
                    name="name"
                    placeholder={"Enter Your Full Name"}
                    title=""
                    handelChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
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
                  <InputView
                    {...props}
                    name="passwordConfirm"
                    placeholder={"Confirm Your Password"}
                    title=""
                    handelChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  <InputView
                    {...props}
                    name="phone_number"
                    placeholder={"Enter Your Phone Number "}
                    title=""
                    handelChange={props.handleChange}
                    handleBlur={props.handleBlur}
                  />
                  <View>
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
                          Sign Up
                        </Text>
                      </View>
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
                    <Text style={{ fontSize: 15 }}>Already have account ?</Text>
                    <TouchableOpacity
                      style={{
                        marginLeft: 5,
                      }}
                      onPress={() => navigation.navigate("Login")}
                    >
                      <Text style={{ color: COLORS.blue, fontSize: 15 }}>
                        Log in
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        </Formik>
      </ScrollView>
    </ImageBackground>
  );
};

export default SignUpScreen;
