import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect } from "react";
import COLORS from "../../values/colors";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import { useSelector } from "react-redux";
import search from "../../../redux/search/searchSlice";
import {
  selectIsSpecialityFound,
  selectSpeciality,
} from "../../../redux/search/searchSlice";
import { useDispatch } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loading from "../../../redux/loading/LoadingSlice";
import axios from "axios";
const DetailedSearchBar = () => {
  const select = useSelector;
  const getTag = select(selectIsSpecialityFound);
  const spec = select(selectSpeciality);
  const dispatch = useDispatch();
  const handleSearch = async (searchTerm) => {
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    console.log(searchTerm);
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/searchDoctors/${searchTerm}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      dispatch(Loading.setLoading(true));
      const response = await axios(config);
      //console.log(response.data);
      dispatch(search.setResponse(response.data.data));
      dispatch(Loading.setLoading(false));
    } catch (error) {
      console.log(error.message);
      dispatch(Loading.setLoading(false));
    }
  };
  return (
    <View style={styles.container}>
      <Input
        leftIcon={
          getTag ? (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="ios-search-sharp" size={24} color={COLORS.blue} />

              <View
                style={{
                  borderWidth: 1,
                  borderColor: COLORS.heavyGrey,
                  borderRadius: BorderRadius.l,
                  padding: MarginsAndPaddings.xs,
                }}
              >
                <Text
                  style={{
                    color: COLORS.heavyGrey,
                  }}
                >
                  {spec}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  dispatch(search.setIsSPecialityFound(false));
                  dispatch(search.setSpeciality(""));
                }}
              >
                <Feather name="x-circle" size={16} color={COLORS.heavyGrey} />
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon name="ios-search-sharp" size={24} color={COLORS.blue} />
            </View>
          )
        }
        rightIconContainerStyle={{ marginRight: -25 }}
        leftIconContainerStyle={{ marginRight: MarginsAndPaddings.l }}
        //placeholder="Search for a doctor"
        inputContainerStyle={styles.Input}
        rightIcon={
          <TouchableOpacity>
            <Image
              source={require("../../components/assets/category.png")}
              style={styles.Image}
            />
          </TouchableOpacity>
        }
        onEndEditing={(value) => handleSearch(value)}
        editable={spec ? false : true}
        value={spec ? "" : null}
      />
    </View>
  );
};

export default DetailedSearchBar;

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
