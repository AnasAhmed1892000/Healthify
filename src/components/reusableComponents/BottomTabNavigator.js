import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../../screens/appScreens/HomeScreen";
import Icon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import COLORS from "../../values/colors";
import AccountScreen from "../../screens/appScreens/AccountScreen";
import SearchScreen from "../../screens/appScreens/SearchScreen";
import AppointmentsScreen from "../../screens/appScreens/AppointmentsScreen";
import ChatScreen from "../../screens/appScreens/ChatScreen";
const BottomTabNavigator = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        name="Appointments"
        component={AppointmentsScreen}
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
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={"ios-search-sharp"}
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
        name="Chat"
        component={ChatScreen}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                name={"heart"}
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
        component={AccountScreen}
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

export default BottomTabNavigator;

const styles = StyleSheet.create({});
