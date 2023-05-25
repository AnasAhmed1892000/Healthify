import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import Tooth from "../svgs/Tooth";
import { TouchableOpacity } from "react-native";
import COLORS from "../../values/colors";
import search from "../../../redux/search/searchSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
const Dentist = ({ spec }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity
        onPress={() => {
          dispatch(search.setIsSPecialityFound(true));
          dispatch(search.setSpeciality("Dentistry"));
          navigation.navigate("Search");
        }}
      >
        <LinearGradient
          style={styles.Container}
          colors={["#E3F4FF", "#86AFC7"]}
        >
          <Tooth />
          <View
            style={{
              marginTop: -10,
            }}
          >
            <Text style={styles.title}>Dentistry</Text>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};

export default Dentist;

const styles = StyleSheet.create({
  Container: {
    width: 105,
    height: 105,
    // opacity: 0.5,
    borderRadius: BorderRadius.ml,
    marginHorizontal: MarginsAndPaddings.l,
    marginTop: MarginsAndPaddings.l,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 13,
    color: COLORS.white,
    fontWeight: "600",
  },
});
