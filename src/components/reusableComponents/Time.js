import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import time from "../../../redux/appointment/TimeSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectID } from "../../../redux/appointment/TimeSlice";
const Time = ({ appointment, isAvailable, selected }) => {
  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isAvailable ? COLORS.lightGrey : COLORS.white,
          borderColor: selected ? COLORS.blue2 : COLORS.lightGrey,
        },
      ]}
    >
      <Text
        style={{
          color: selected ? COLORS.blue2 : COLORS.heavyGrey,
        }}
      >
        {appointment}
      </Text>
    </View>
  );
};

export default Time;

const styles = StyleSheet.create({
  container: {
    width: 105,
    height: 40,
    borderWidth: 1,

    borderRadius: BorderRadius.l,
    alignItems: "center",
    justifyContent: "center",
    //marginLeft: MarginsAndPaddings.l,
    marginTop: MarginsAndPaddings.l,
  },
});
