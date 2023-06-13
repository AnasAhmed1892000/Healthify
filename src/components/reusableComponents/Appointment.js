import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import { TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const Appointment = ({ name, date, time, id, photo }) => {
  //console.log(id);
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
            <TouchableOpacity
              style={{
                marginTop: MarginsAndPaddings.ml,
                borderBottomWidth: 1,
                borderTopWidth: 1,
                borderRightWidth: 1,
                borderLeftWidth: 1,
                width: 150,
                height: 30,
                justifyContent: "center",
                alignItems: "center",
                borderColor: COLORS.white,
                borderRadius: BorderRadius.l,
              }}
              onPress={cancelAppointmentByID}
            >
              <Text
                style={{
                  fontSize: 14,
                  color: COLORS.white,
                  fontWeight: "600",
                }}
              >
                Cancel Appointment
              </Text>
            </TouchableOpacity>
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
              marginLeft: MarginsAndPaddings.ml,
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
      </LinearGradient>
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 166,
    borderRadius: 35,
  },
  inner: {
    //paddingHorizontal: MarginsAndPaddings.l,
    paddingVertical: MarginsAndPaddings.ml,
  },
});
