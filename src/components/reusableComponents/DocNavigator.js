import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DocAppointmentSceen from "../../screens/doctorScreens/DocAppointmentSceen";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import COLORS from "../../values/colors";
import DocAccountScreen from "../../screens/doctorScreens/DocAccountScreen";
import SetAvailbleTimesScreen from "../../screens/doctorScreens/SetAvailbleTimesScreen";
const DocNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={DocAppointmentSceen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name={"home"}
                size={30}
                style={{
                  marginBottom: 3,
                  alignSelf: "center",
                }}
                color={focused ? COLORS.blue : COLORS.lightGrey}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="SetAvailbleTimes"
        component={SetAvailbleTimesScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={"ios-calendar"}
                size={30}
                style={{
                  marginBottom: 3,
                  alignSelf: "center",
                }}
                color={focused ? COLORS.blue : COLORS.lightGrey}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="Account"
        component={DocAccountScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Entypo
                name={"user"}
                size={30}
                style={{
                  marginBottom: 3,
                  alignSelf: "center",
                }}
                color={focused ? COLORS.blue : COLORS.lightGrey}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default DocNavigator;

const styles = StyleSheet.create({});
