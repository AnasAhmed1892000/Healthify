import { StyleSheet, Image, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import COLORS from "../../values/colors";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import { useNavigation } from "@react-navigation/native";
import search from "../../../redux/search/searchSlice";
import { useDispatch } from "react-redux";
const SearchBar = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Input
        leftIcon={
          <Icon name="ios-search-sharp" size={24} color={COLORS.blue} />
        }
        rightIconContainerStyle={{ marginRight: -25 }}
        leftIconContainerStyle={{ marginRight: MarginsAndPaddings.l }}
        placeholder="Search for a doctor"
        inputContainerStyle={styles.Input}
        onPressIn={() => {
          dispatch(search.setIsSPecialityFound(false));
          dispatch(search.setSpeciality(""));
          navigation.navigate("Search");
        }}
        rightIcon={
          <TouchableOpacity>
            <Image
              source={require("../../components/assets/category.png")}
              style={styles.Image}
            />
          </TouchableOpacity>
        }
        disabled={true}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.XlightGrey,
    opacity: 0.7,
    width: 352,
    height: 46,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: MarginsAndPaddings.l,
    paddingTop: MarginsAndPaddings.m,
    borderRadius: BorderRadius.l,
  },
  Image: {
    width: 20,
    height: 20,
    marginRight: MarginsAndPaddings.ml,
  },
  Input: {
    borderBottomWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    marginTop: MarginsAndPaddings.xxl,
  },
});
