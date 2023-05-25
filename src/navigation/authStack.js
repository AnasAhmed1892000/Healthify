import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/authScreens/signUp/SignUpScreen";
import LoginScreen from "../screens/authScreens/login/LoginScreen";
import ForgetPassword1 from "../screens/authScreens/forgetPassword/ForgetPassword1";
import ForgetPassword2 from "../screens/authScreens/forgetPassword/ForgetPassword2";
const stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <stack.Navigator initialRouteName="Login">
      <stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="ForgetPassword1"
        component={ForgetPassword1}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="ForgetPassword2"
        component={ForgetPassword2}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};
export default AuthStack;
