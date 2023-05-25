import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Logo from "../../../components/svgs/Logo";
import { styles } from "./styles";
import InputView from "../../../components/reusableComponents/InputView";
import { Formik } from "formik";
import * as Yup from "yup";
import { BorderRadius, MarginsAndPaddings } from "../../../values/dimensions";
import axios from "axios";
import COLORS from "../../../values/colors";
const ForgetPassword1 = () => {
  const FPVS = Yup.object().shape({
    email: Yup.string()
      .email("Please enter valid email")
      .required("Email Address is Required"),
  });
  const resetPasswordFromEmail = async (email) => {
    let data = JSON.stringify({
      email: email,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/users/forgotPassword",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDEwN2UyNDU5NWNjNmJiZjZmNDEzOSIsImlhdCI6MTY4NDYwMzE2NiwiZXhwIjoxNjkyMzc5MTY2fQ.4OyFqb7Sj15Yd9MMHEJJmVBQeAZa2bplpcHM4aJIpbM",
      },
      data: data,
    };
    const response = await axios(config);
    console.log(response.status);
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
      <SafeAreaView style={styles.contianer}>
        <View style={styles.LogoStyle}>
          <Logo width={"250.000000pt"} height={"250.000000pt"} />
        </View>
        <Formik
          validationSchema={FPVS}
          initialValues={{
            email: "",
          }}
          onSubmit={(values) => {
            //resetPasswordFromEmail(values);
          }}
        >
          {(props) => {
            return (
              <View style={styles.formStyle}>
                <InputView
                  {...props}
                  name="email"
                  placeholder={"Enter Your Email"}
                  title=""
                  handelChange={props.handleChange}
                  handleBlur={props.handleBlur}
                />
                <TouchableOpacity
                  style={{
                    justifyContent: "center",
                    width: 200,
                    height: 54,
                    backgroundColor: COLORS.mianBlue,
                    marginTop: MarginsAndPaddings.xl,
                    marginLeft: -65,
                    borderRadius: BorderRadius.xl,
                  }}
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
                      Send Code
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        </Formik>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default ForgetPassword1;
