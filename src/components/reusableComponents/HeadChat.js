import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { MarginsAndPaddings } from "../../values/dimensions";
import { Image } from "react-native";
import COLORS from "../../values/colors";
import Entypo from "react-native-vector-icons/Entypo";
import { Divider } from "react-native-elements";
const HeadChat = () => {
  return (
    <View style={styles.container}>
      <View style={styles.subContainer1}>
        <Image source={require("../assets/doctor.jpg")} style={styles.Image} />
      </View>
      <View style={styles.subContainer2}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              // marginRight: 35,
            }}
          >
            <Text style={styles.title}>DR. Sarah Johnson</Text>
            <Entypo name="dot-single" color={COLORS.lightBlue} size={28} />
          </View>
          <Text style={styles.time}>6:42 PM</Text>
        </View>
        <Text
          style={{
            overflow: "hidden",
          }}
          ellipsizeMode="tail"
          numberOfLines={2}
        >
          Hello omar , we have an appointment today are you ready ?
        </Text>
        <Divider width={1} />
      </View>
    </View>
  );
};

export default HeadChat;

const styles = StyleSheet.create({
  container: {
    marginTop: MarginsAndPaddings.ml,
    marginVertical: MarginsAndPaddings.xl,
    marginHorizontal: MarginsAndPaddings.l,
    height: 80,
    flexDirection: "row",
    paddingRight: MarginsAndPaddings.ml + 50,
  },
  subContainer1: {},
  subContainer2: {
    paddingLeft: MarginsAndPaddings.m,
    justifyContent: "space-between",
  },
  Image: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: COLORS.lightBlue,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
  },
  time: {
    fontSize: 12,
    fontWeight: "500",
  },
  unReadMessage: {
    fontSize: 14,
    fontWeight: "600",
  },
});
