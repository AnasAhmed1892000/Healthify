import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Logo from "../svgs/Logo";
import Stethoscope from "../svgs/Stethoscope-svgrepo";
import Syrige from "../svgs/Syrige";
import Capsule from "../svgs/Capsule";
import Notepad from "../svgs/Notepad";
import MedicalExamination from "../svgs/MedicalExamination";

const Background = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "space-evenly",
        paddingBottom: 1500,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 10,
        }}
      >
        <Stethoscope />
        <Notepad />
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingVertical: 150,
          paddingVertical: 60,
        }}
      >
        <MedicalExamination />
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "stretch",
          justifyContent: "space-between",
          paddingVertical: 60,
        }}
      >
        <Syrige />
        <Capsule />
      </View>
    </View>
  );
};

export default Background;

const styles = StyleSheet.create({});
