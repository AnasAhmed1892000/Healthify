import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import { useNavigation } from "@react-navigation/native";

const EMR = ({ title, appointmentID, doctorID }) => {
  const screenWidth = Dimensions.get("window").width;
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.container, { width: screenWidth / 1.3 }]}
      onPress={() =>
        navigation.navigate("MedicalRecords", { appointmentID, doctorID })
      }
    >
      <Text
        style={{
          marginVertical: MarginsAndPaddings.l,
          marginHorizontal: MarginsAndPaddings.l,
        }}
      >
        {title} Consaltation Record
      </Text>
    </TouchableOpacity>
  );
};

export default EMR;

const styles = StyleSheet.create({
  container: {
    borderRadius: BorderRadius.l,
    borderWidth: 1.2,
    borderColor: COLORS.heavyGrey,
    marginVertical: MarginsAndPaddings.l,
  },
});
