import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import { useNavigation } from "@react-navigation/native";
const Title = ({ title, seeAll, destination, width, height }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.title}>
      <View
        style={{
          backgroundColor: "#1FADFF",
          width: width,
          height: height,
          justifyContent: "center",
          alignItems: "center",
          marginLeft: -40,
          borderRadius: BorderRadius.l,
        }}
      >
        <Text style={styles.Text}>{title}</Text>
      </View>
      {seeAll ? (
        <TouchableOpacity onPress={() => navigation.navigate("Appointments")}>
          <Text style={{ fontSize: 18, opacity: 0.7 }}>see all</Text>
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: MarginsAndPaddings.ml,
    paddingHorizontal: MarginsAndPaddings.l,
    alignItems: "center",
  },
  Text: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.white,
  },
});
