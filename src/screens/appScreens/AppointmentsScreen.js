import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../../components/reusableComponents/Title";
import Appointment from "../../components/reusableComponents/Appointment";
import { MarginsAndPaddings } from "../../values/dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AppointmentsScreen = () => {
  const [todaysAppointments, setTodaysAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const data = [
    {
      name: "DR. Robert Fox",
      spectiality: "cardiologist",
      date: "16 Jan ",
      time: "8:00 PM",
      id: 1,
    },
    {
      name: "DR. Robert Fox",
      spectiality: "cardiologist",
      date: "16 Jan ",
      time: "8:00 PM",
      id: 2,
    },
    {
      name: "DR. Robert Fox",
      spectiality: "cardiologist",
      date: "16 Jan ",
      time: "8:00 PM",
      id: 3,
    },
    {
      name: "DR. Robert Fox",
      spectiality: "cardiologist",
      date: "16 Jan ",
      time: "8:00 PM",
      id: 4,
    },
  ];
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

      setUpcomingAppointments(response.data.data.upcomingAppointments);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAppointments();
  }, []);
  return (
    <SafeAreaView>
      <Title title="Appointments" width={185} height={35} />
      {loading ? <ActivityIndicator /> : null}

      <View style={styles.container}>
        <View
          style={{
            marginTop: MarginsAndPaddings.l,
          }}
        >
          <Text
            style={{
              marginBottom: MarginsAndPaddings.l,
            }}
          >
            Today :{" "}
          </Text>
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
            key={(item) => item.id}
          />
        </View>
        <View
          style={{
            marginTop: MarginsAndPaddings.ml,
          }}
        >
          <Text
            style={{
              marginBottom: MarginsAndPaddings.l,
            }}
          >
            Later :{" "}
          </Text>
          <FlatList
            data={upcomingAppointments}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={{
                  marginHorizontal: MarginsAndPaddings.l,
                }}
              >
                <Appointment
                  name={item.name}
                  date={item.date.split("T")[0]}
                  time={item.time}
                  id={item._id}
                />
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AppointmentsScreen;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: MarginsAndPaddings.l,
  },
});
