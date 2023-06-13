import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import Login from "../../../redux/user/LoginSlice";
import user from "../../../redux/user/userSlice";
import Title from "../../components/reusableComponents/Title";
import DocAppointment from "../../components/reusableComponents/DocAppointment";

import axios from "axios";

const DocAppointmentSceen = () => {
  const dispatch = useDispatch();
  const [Response, setResponse] = useState({});
  const screenWidth = Dimensions.get("window").width;
  const screenHeight = Dimensions.get("window").height;
  const [selectedView, setSelectedView] = useState("upcoming");
  const [todays, setTodays] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [completed, setCompleted] = useState([]);
  const todaysAppointments = {
    upcoming: [
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
    ],
    completed: [
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:20 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
    ],
  };
  const upcomingAppointments = {
    upcoming: [
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
    ],
    completed: [
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
      {
        name: "anas ahmed ",
        date: "16 Jan",
        time: "05:30 PM",
      },
    ],
  };
  const handleViewPress = (view) => {
    if (selectedView === view) {
      // unselect the view if it's already selected
      setSelectedView(null);
    } else {
      // select the view
      setSelectedView(view);
    }
  };
  const getDoctorAppointments = async () => {
    const token = await AsyncStorage.getItem("token");
    var config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/doctors/viewMyAppointments",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      if (response.data.status == "success") {
        setResponse(response.data);
        setTodays(response.data.data.todayAppointments);
        setUpcoming(response.data.data.upcomingAppointments);
        setCompleted(response.data.data.completedAppointments);
      }
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };
  useEffect(() => {
    getDoctorAppointments();
  }, [selectedView]);
  return (
    <SafeAreaView style={styles.conntainer}>
      <View
        style={{
          marginLeft: MarginsAndPaddings.l,
          marginBottom: MarginsAndPaddings.ml,
        }}
      >
        <Title title="Appointments" width={170} height={40} />
      </View>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => handleViewPress("upcoming")}
          disabled={selectedView == "upcoming" ? true : false}
        >
          <View
            style={[
              styles.genderContainer,
              selectedView === "upcoming" && styles.selectedView,
            ]}
          >
            <Text
              style={[
                styles.gender,
                selectedView === "upcoming"
                  ? { color: COLORS.white }
                  : { color: COLORS.black },
              ]}
            >
              upcoming
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleViewPress("completed")}
          disabled={selectedView == "completed" ? true : false}
        >
          <View
            style={[
              styles.genderContainer,
              selectedView === "completed" && styles.selectedView,
            ]}
          >
            <Text
              style={[
                styles.gender,
                selectedView === "completed"
                  ? { color: COLORS.white }
                  : { color: COLORS.black },
              ]}
            >
              completed
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <>
        {selectedView === "upcoming" ? (
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
              {todays.length == 0 ? null : (
                <FlatList
                  data={todays}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: MarginsAndPaddings.l,
                      }}
                    >
                      <DocAppointment
                        name={item.patient_id.name}
                        date={item.date.split("T")[0]}
                        time={item.time}
                        id={item._id}
                        photo={item.patient_id.photo}
                        completed={false}
                      />
                    </View>
                  )}
                  // keyExtractor={(item) => item.}
                />
              )}
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
              {upcoming.length == 0 ? null : (
                <FlatList
                  data={upcoming}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        marginHorizontal: MarginsAndPaddings.l,
                      }}
                    >
                      <DocAppointment
                        name={item.patient_id.name}
                        date={item.date.split("T")[0]}
                        time={item.time}
                        id={item._id}
                        photo={item.patient_id.photo}
                        completed={false}
                      />
                    </View>
                  )}
                  // keyExtractor={(item) => item.}
                />
              )}
            </View>
          </View>
        ) : (
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
                Completed Appointments :{" "}
              </Text>
              <FlatList
                data={completed}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <View
                    style={{
                      marginHorizontal: MarginsAndPaddings.l,
                    }}
                  >
                    <DocAppointment
                      name={item.patient_id.name}
                      date={item.date.split("T")[0]}
                      time={item.time}
                      id={item._id}
                      photo={item.patient_id.photo}
                      completed={true}
                    />
                  </View>
                )}
                // keyExtractor={(item) => item.}
              />
            </View>
          </View>
        )}
      </>
    </SafeAreaView>
  );
};

export default DocAppointmentSceen;

const styles = StyleSheet.create({
  conntainer: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: MarginsAndPaddings.ml,
  },

  genderContainer: {
    width: 150,
    height: 45,
    borderWidth: 1,
    borderRadius: BorderRadius.s,
    borderColor: COLORS.lightGrey,

    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  gender: {
    fontSize: 20,
  },
  selectedView: {
    backgroundColor: COLORS.lightBlue,
  },
  container: {
    paddingHorizontal: MarginsAndPaddings.l,
  },
});
