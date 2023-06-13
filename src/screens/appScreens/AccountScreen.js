import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  Image,
  Dimensions,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import React, { useCallback, useEffect, useState, useRef } from "react";
import Login from "../../../redux/user/LoginSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import * as ImagePicker from "expo-image-picker";
import image from "../../../redux/image/imageSlice";
import { selectImageUri } from "../../../redux/image/imageSlice";
import { Notifications } from "expo-notifications";
import Title from "../../components/reusableComponents/Title";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import {
  selectEmail,
  selectPhoneNumber,
  selectUsername,
} from "../../../redux/user/userSlice";
import user from "../../../redux/user/userSlice";
/*
 */

const AccountScreen = () => {
  const [loading, setLoading] = useState(false);
  const [editProfile, setEditProfile] = useState(false);
  const [error, setError] = useState("");
  const [Response, setResponse] = useState({});
  const navigation = useNavigation();
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const select = useSelector;
  const uri = select(selectImageUri);
  const userName = select(selectUsername);
  const userEmail = select(selectEmail);
  const userPhoneNumber = select(selectPhoneNumber);
  const getUserData = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem("token");
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: "https://healthify-103r.onrender.com/api/v1/users/ReOpenApp",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      var response = await axios(config);
      setResponse(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [name, setName] = useState(userName);
  const [Email, setEmail] = useState(userEmail);
  const [phoneNumber, setPhoneNumber] = useState(userPhoneNumber);
  const updateUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = JSON.stringify({
      name: name,
      email: Email,
      phone_number: phoneNumber,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/users/updateMe",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      if (response.data.status == "success") {
        getUserData();
        setEditProfile(false);
        console.log(response.data);
      }
    } catch (error) {
      console.log("Error in updating user data :", error.message);
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
    } else {
      setError(null);
    }
  };
  const runSpecificFunction = useRef(false);
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (!result.canceled) {
        dispatch(image.setImageUri(result.uri));
        runSpecificFunction.current = true;
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const uploadImage = async () => {
    const token = await AsyncStorage.getItem("token");
    try {
      let formData = new FormData();
      formData.append("photo", {
        uri: uri,
        name: "image.jpg",
        type: "image/jpeg",
      });
      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://healthify-103r.onrender.com/api/v1/users/updateMe",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", // Set the content type for form data
        },
        data: formData,
      };
      const response = await axios(config);
      console.log("Upload success:", response.data);
      // getUserData();
    } catch (error) {
      console.log("Error uploading image:", error);
      alert("Error uploading image:", error);
    }
  };
  useEffect(() => {
    if (runSpecificFunction.current) {
      uploadImage()
        .then(() => {
          getUserData();
          runSpecificFunction.current = false;
        })
        .catch((error) => {
          console.log("error in the hook:", error);
        });
    }
  }, [pickImage]);
  useEffect(() => {
    getUserData();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: COLORS.white }}>
      <ScrollView style={[styles.container, { height: "100%" }]}>
        <View style={[styles.title, { width: screenWidth }]}>
          <Title title="My Account" height={30} width={170} seeAll={false} />

          <View
            style={{
              position: "absolute",
              right: 20,
              top: 20,
            }}
          >
            <Button
              title={!editProfile ? "Edit Profile" : "submit"}
              onPress={() => {
                editProfile ? updateUserData() : setEditProfile(true);
              }}
              disabled={error ? true : false}
            />
          </View>
        </View>
        <View
          style={{
            width: screenWidth - 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={pickImage}
            style={styles.profilePic}
            disabled={!editProfile}
          >
            <Image
              source={{
                uri: `https://healthify-103r.onrender.com/img/users/${Response.photo}`,
              }}
              style={styles.image}
              resizeMode="cover"
            />
          </TouchableOpacity>
          <View
            style={{
              alignItems: "flex-start",
              marginTop: MarginsAndPaddings.l,
            }}
          >
            <View style={styles.container}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={[styles.input, { width: screenWidth / 1.2 }]}
                onChangeText={setName}
                value={name}
                editable={editProfile}
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={[styles.input, { width: screenWidth / 1.2 }]}
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                keyboardType="phone-pad"
                editable={editProfile}
              />

              <Text style={styles.label}>Email</Text>
              <TextInput
                style={[styles.input, { width: screenWidth / 1.2 }]}
                value={Email}
                onChangeText={setEmail}
                onBlur={validateEmail}
                editable={editProfile}
              />
              {error ? <Text style={{ color: "red" }}>{error}</Text> : null}

              {/* <Button title="Submit" onPress={handleSubmit} /> */}
            </View>
          </View>
        </View>

        <View
          style={{
            marginTop: MarginsAndPaddings.ml,
            flex: 1,
            marginBottom: MarginsAndPaddings.l,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate("BMI")}
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
                Calculate BMI
              </Text>
              {/* <Icon name="ios-calendar" size={18} color={COLORS.white} /> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate("EMR")}
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
                View EMR
              </Text>
              {/* <Icon name="ios-calendar" size={18} color={COLORS.white} /> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => navigation.navigate("MedicineReminders")}
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
                Medicine Reminders
              </Text>
              {/* <Icon name="ios-calendar" size={18} color={COLORS.white} /> */}
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={async () => {
              dispatch(Login.setCurrentUser(false));
              dispatch(user.setRole(null));
              dispatch(user.setUsername(null));
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
              {/* <Icon name="ios-calendar" size={18} color={COLORS.white} /> */}
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: MarginsAndPaddings.l,
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
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: BorderRadius.l,
    paddingLeft: MarginsAndPaddings.l,
    fontSize: 18,
    borderColor: COLORS.heavyGrey,
    color: COLORS.heavyGrey,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: MarginsAndPaddings.s,
    marginTop: MarginsAndPaddings.s,
    color: COLORS.heavyGrey,
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
