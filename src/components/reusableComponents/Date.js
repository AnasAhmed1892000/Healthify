import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import { Colors } from "react-native/Libraries/NewAppScreen";
import COLORS from "../../values/colors";

const Date = ({ date, appointments, selected }) => {
  return (
    <View
      style={[
        styles.container,
        {
          //backgroundColor: appointments == 0 ? COLORS.lightGrey : COLORS.white,
          borderColor: selected ? COLORS.blue2 : COLORS.lightGrey,
        },
      ]}
    >
      <Text
        style={{
          fontSize: 16,
        }}
      >
        {date}
      </Text>
      <Text
        style={{
          color: selected ? COLORS.blue2 : COLORS.heavyGrey,
        }}
      >
        {appointments} Appointments Available
      </Text>
    </View>
  );
};

export default Date;

const styles = StyleSheet.create({
  container: {
    width: 190,
    height: 70,
    borderWidth: 1,
    borderRadius: BorderRadius.l,
    marginHorizontal: MarginsAndPaddings.l,
    alignItems: "center",
    justifyContent: "center",
    borderColor: COLORS.lightGrey,
    marginTop: MarginsAndPaddings.l,
  },
});
