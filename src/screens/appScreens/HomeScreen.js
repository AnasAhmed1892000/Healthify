import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  FlatList,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useCallback, useState } from "react";
import SearchBar from "../../components/reusableComponents/SearchBar";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/Entypo";
import Title from "../../components/reusableComponents/Title";
import Appointment from "../../components/reusableComponents/Appointment";
import EarNoseThroat from "../../components/reusableComponents/EarNoseThroat";
import Neurologist from "../../components/reusableComponents/Neurologist";
import Gastreonterologist from "../../components/reusableComponents/Gastreonterologist";
import Pulmonologist from "../../components/reusableComponents/Pulmonologist";
import Cardiologist from "../../components/reusableComponents/Cardiologist";
import Orthopedist from "../../components/reusableComponents/Orthopedist";
import Dentist from "../../components/reusableComponents/Dentist";
import Obstetrician from "../../components/reusableComponents/Obstetrician";
import Hepatologist from "../../components/reusableComponents/Hepatologist";
import axios from "axios";
import user from "../../../redux/user/userSlice";
import { selectUsername, selectImage } from "../../../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { selectImageUri } from "../../../redux/image/imageSlice";
import image from "../../../redux/image/imageSlice";
import { useFocusEffect } from "@react-navigation/native";
const HomeScreen = () => {
  const dispatch = useDispatch();
  const select = useSelector;
  const name = select(selectUsername);
  const uri = select(selectImageUri);
  let image;
  //console.log(image);

  const [Response, setResponse] = useState({});
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAppointments = async () => {
    const token = await AsyncStorage.getItem("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/viewMyAppointments",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);

      setTodaysAppointments(response.data.data.todayAppointments);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  getUserData = async () => {
    const token = await AsyncStorage.getItem("token");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/users/ReOpenApp",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      // dispatch(Loading.setLoading(true));

      if (response.data.status == "success") {
        // dispatch(Loading.setLoading(false));
        // dispatch(Login.setCurrentUser(true));
        dispatch(user.setUsername(response.data.patient.name));
        dispatch(user.setEmail(response.data.email));
        dispatch(user.setPhoneNumber(response.data.phone_number));
        setResponse(response.data);
      }
    } catch (error) {
      console.log(error.message);
      // dispatch(Loading.setLoading(false));
      // dispatch(Login.setCurrentUser(false));
      // if (error.message.includes("401")) {
      //   // Display an error message to the user using an alert or a toast message
      //   alert("Invalid email or password. Please try again.");
      // } else {
      //   alert("Something went wrong please try agian later ");
      // }
    }
  };
  useFocusEffect(
    useCallback(() => {
      getUserData();
      getAppointments();
    }, [])
  );

  return (
    <SafeAreaView style={styles.basicContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text
                style={{
                  marginBottom: MarginsAndPaddings.l,
                  fontSize: 15,
                  fontWeight: "500",
                  opacity: 0.5,
                }}
              >
                Hello !
              </Text>

              {name == null ? null : (
                <Text
                  style={{
                    marginBottom: MarginsAndPaddings.l,
                    fontSize: 18,
                    fontWeight: "600",
                    opacity: 0.7,
                  }}
                >
                  {name}
                </Text>
              )}
            </View>
            <View
              style={{
                width: 50,
                height: 50,
                borderColor: COLORS.lightBlue,
                borderLeftWidth: 1,
                borderRightWidth: 1,
                borderTopWidth: 1,
                borderBottomWidth: 1,
                borderBottomRightRadius: BorderRadius.m,
                borderBottomLeftRadius: BorderRadius.m,
                borderTopLeftRadius: BorderRadius.m,
                borderTopRightRadius: BorderRadius.m,
                overflow: "hidden",
                marginBottom: MarginsAndPaddings.l,
              }}
            >
              <Image
                source={{
                  uri: `https://healthify-103r.onrender.com/img/users/${Response.photo}`,
                }}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                }}
              />
            </View>
          </View>
          <View>
            <SearchBar />
            <Title
              title=" Appointments"
              seeAll={true}
              width={182}
              height={35}
            />
            {loading ? <ActivityIndicator /> : null}
            <View style={styles.list}>
              {todaysAppointments.length == 0 ? null : (
                <FlatList
                  data={todaysAppointments}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: MarginsAndPaddings.l,
                      }}
                    >
                      <Appointment
                        name={item.doctor_id.name}
                        date={item.date.split("T")[0]}
                        time={item.time}
                        id={item._id}
                        photo={item.doctor_id.photo}
                      />
                    </View>
                  )}
                  keyExtractor={(item) => item.id}
                />
              )}

              <Title
                title="Specialities "
                seeAll={false}
                width={156}
                height={35}
              />
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: -9,
                }}
              >
                <EarNoseThroat />
                <Neurologist />
                <Gastreonterologist />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: -9,
                }}
              >
                <Pulmonologist />
                <Cardiologist />
                <Orthopedist />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  marginLeft: -9,
                }}
              >
                <Dentist />
                <Obstetrician />
                <Hepatologist />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: MarginsAndPaddings.l,
  },
  basicContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  list: {
    marginTop: MarginsAndPaddings.ml,
  },
});
