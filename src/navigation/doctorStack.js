import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DocAppointmentSceen from "../screens/doctorScreens/DocAppointmentSceen";
import DocNavigator from "../components/reusableComponents/DocNavigator";
import DocEMRScreen from "../screens/doctorScreens/DocEMRScreen";
/*
 */
const stack = createNativeStackNavigator();
const DoctorStack = () => {
  return (
    <stack.Navigator>
      <stack.Screen
        name="DocAppoinyment"
        component={DocNavigator}
        options={{
          headerShown: false,
        }}
      />
      <stack.Screen
        name="DocEMR"
        component={DocEMRScreen}
        options={{
          headerShown: false,
        }}
      />
    </stack.Navigator>
  );
};
export default DoctorStack;
