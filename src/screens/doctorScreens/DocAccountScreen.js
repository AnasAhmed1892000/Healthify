import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../values/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Title from "../../components/reusableComponents/Title";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import { useDispatch } from "react-redux";
import Login from "../../../redux/user/LoginSlice";
import user from "../../../redux/user/userSlice";

const DocAccountScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [photo, setPhoto] = useState("");
  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://healthify-103r.onrender.com/api/v1/users/ReOpenApp",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios(config);
      setEmail(response.data.email);
      setPhoneNumber(response.data.phone_number);
      setName(response.data.doctor.name);
      setPhoto(response.data.photo);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: MarginsAndPaddings.l,
        }}
      >
        <Title title="My Account" width={160} height={35} />
      </View>
      <View style={styles.subContainer1}>
        <View style={styles.profilePic}>
          <Image
            source={{
              uri: `https://healthify-103r.onrender.com/img/users/${photo}`,
            }}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          paddingLeft: MarginsAndPaddings.ml,
        }}
      >
        <View style={styles.subContainer2}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, { width: screenWidth / 1.2 }]}
            value={name}
            editable={false}
          />

          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[styles.input, { width: screenWidth / 1.2 }]}
            value={phoneNumber}
            editable={false}
          />

          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, { width: screenWidth / 1.2 }]}
            value={Email}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.subContainer3}>
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={async () => {
            dispatch(Login.setCurrentUser(false));
            dispatch(user.setRole(null));
            const key = "token";
            await AsyncStorage.removeItem(key);
          }}
        >
          <View style={[styles.btn, { width: screenWidth / 1.2 }]}>
            <Text
              style={{
                marginRight: MarginsAndPaddings.l,
                fontSize: 18,
                color: COLORS.white,
                fontWeight: "600",
              }}
            >
              Logout
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DocAccountScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: MarginsAndPaddings.l,
  },
  subContainer1: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  subContainer2: {
    paddingHorizontal: MarginsAndPaddings.l,
    width: "100%",
    alignItems: "flex-start",
  },
  subContainer3: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: MarginsAndPaddings.l,
    marginTop: MarginsAndPaddings.ml,
  },
  profilePic: {
    marginTop: MarginsAndPaddings.l,
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: COLORS.lightBlue,
    overflow: "hidden", // to clip the image inside the view
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: MarginsAndPaddings.s,
    marginTop: MarginsAndPaddings.s,
    color: COLORS.heavyGrey,
    marginTop: MarginsAndPaddings.l,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.l,
    paddingLeft: MarginsAndPaddings.l,
    fontSize: 18,
    borderColor: COLORS.heavyGrey,
    color: COLORS.heavyGrey,
    marginTop: MarginsAndPaddings.l,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  btn: {
    height: 46,
    marginTop: MarginsAndPaddings.ml,
    backgroundColor: COLORS.lightBlue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: MarginsAndPaddings.xxl,
    borderRadius: BorderRadius.l,
    marginLeft: MarginsAndPaddings.xxxl,
  },
});
