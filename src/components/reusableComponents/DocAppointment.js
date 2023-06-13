import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Octicons from "react-native-vector-icons/Octicons";
import { useNavigation } from "@react-navigation/native";
const DocAppointment = ({ name, date, time, id, photo, completed }) => {
  const navigation = useNavigation();
  const cancelAppointmentByID = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/cancelAppointmentByID/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  const markAppointmentAsCompleted = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = JSON.stringify({
      id: id,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/doctors/markAppointmentAsCompletedByID",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <LinearGradient colors={["#BBE2FF", "#004F80"]} style={styles.container}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: MarginsAndPaddings.l,
          }}
        >
          <View style={styles.inner}>
            <Text
              style={{ fontSize: 22, color: COLORS.white, fontWeight: "600" }}
            >
              {name}
            </Text>

            <Text
              style={{
                fontSize: 18,
                color: COLORS.white,
                fontWeight: "600",
                marginTop: MarginsAndPaddings.l,
              }}
            >
              {date} | {time}
            </Text>
          </View>
          <View
            style={{
              height: 100,
              borderColor: COLORS.white,
              borderLeftWidth: 1,
              borderRightWidth: 1,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderBottomRightRadius: BorderRadius.ml,
              borderBottomLeftRadius: BorderRadius.ml,
              borderTopLeftRadius: BorderRadius.ml,
              borderTopRightRadius: BorderRadius.ml,
              marginTop: MarginsAndPaddings.l,
              marginLeft: MarginsAndPaddings.l,
              overflow: "hidden",
            }}
          >
            <Image
              source={{
                uri: `https://healthify-103r.onrender.com/img/users/${photo}`,
              }}
              style={{
                width: 55,
                height: 100,
                resizeMode: "stretch",

                borderRadius: BorderRadius.ml,
              }}
              resizeMode="stretch"
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            marginHorizontal: MarginsAndPaddings.ml,
            justifyContent: "space-between",
            marginBottom: MarginsAndPaddings.ml,
            paddingBottom: MarginsAndPaddings.ml,
            width: "50%",
            marginRight: MarginsAndPaddings.ml,
            marginTop: -MarginsAndPaddings.xxl,
          }}
        >
          {!completed ? (
            <>
              <TouchableOpacity
                style={{
                  marginTop: MarginsAndPaddings.ml,
                  justifyContent: "center",
                  alignItems: "center",
                  //borderColor: COLORS.white,
                  //borderRadius: BorderRadius.l,
                }}
                onPress={markAppointmentAsCompleted}
              >
                <Icon
                  name="checkmark-circle-outline"
                  size={35}
                  color={COLORS.white}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: MarginsAndPaddings.ml,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: COLORS.white,
                  borderRadius: BorderRadius.l,
                }}
                onPress={cancelAppointmentByID}
              >
                <Octicons name="x-circle" size={30} color={COLORS.white} />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={{
                  marginTop: MarginsAndPaddings.ml,
                  justifyContent: "center",
                  alignItems: "center",
                  borderColor: COLORS.white,
                  borderRadius: BorderRadius.l,
                }}
                onPress={() =>
                  navigation.navigate("DocEMR", { name, photo, id })
                }
              >
                <MaterialCommunityIcons
                  name="circle-edit-outline"
                  size={30}
                  color={COLORS.white}
                />
              </TouchableOpacity>
            </>
          )}
        </View>
      </LinearGradient>
    </View>
  );
};

export default DocAppointment;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 175,
    borderRadius: 35,
  },
  inner: {
    //paddingHorizontal: MarginsAndPaddings.l,
    paddingVertical: MarginsAndPaddings.ml,
  },
});
