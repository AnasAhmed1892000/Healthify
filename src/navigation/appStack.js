import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignUpScreen from "../screens/authScreens/signUp/SignUpScreen";
import HomeScreen from "../screens/appScreens/HomeScreen";
import BottomTabNavigator from "../components/reusableComponents/BottomTabNavigator";
import SearchScreen from "../screens/appScreens/SearchScreen";
import DoctorScreen from "../screens/appScreens/DoctorScreen";
import DoctorProfileScreen from "../screens/appScreens/DoctorProfileScreen";
import BMIScreen from "../screens/appScreens/BMIScreen";
import EMRScreen from "../screens/appScreens/EMRScreen";
import DoctorEmrScreen from "../screens/appScreens/DoctorEmrScreen";
import MedicalRecordScreen from "../screens/appScreens/MedicalRecordScreen";
const stack = createNativeStackNavigator();
const AppStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="home"
        component={BottomTabNavigator}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="Doctor"
        component={DoctorScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="DoctorProfile"
        component={DoctorProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="BMI"
        component={BMIScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="EMR"
        component={EMRScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="DoctorEmr"
        component={DoctorEmrScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="MedicalRecords"
        component={MedicalRecordScreen}
        options={{
          headerShown: false,
        }}
      />

      {/* <stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="OTP"
        component={OTPScreen}
        options={{
          headerShown: false,
        }}
      /> */}
    </stack.Navigator>
  );
};
export default AppStack;
