import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  Button,
  DatePickerIOS,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import COLORS from "../../values/colors";
import Title from "../../components/reusableComponents/Title";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const SetAvailbleTimesScreen = () => {
  const screenWidth = Dimensions.get("window").width;
  const initialDate = new Date(); // Today's date

  // Extract the year, month, and day from the initial date
  const initialYear = initialDate.getFullYear();
  const initialMonth = initialDate.getMonth();
  const initialDay = initialDate.getDate();

  // Create a new date using the extracted year, month, and day
  const initialSelectedDate = new Date(initialYear, initialMonth, initialDay);
  const [date, setDate] = useState(new Date());
  const [formatedDate, setFormatedDate] = useState(
    date.toISOString().split("T")[0]
  );
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const time = new Date();
  const hours = time.getHours().toString();
  const minutes = time.getMinutes().toString();
  const formattedTime = `${hours}:${minutes}`;
  const fpgdfpgdff = formatedDate.split("T")[0];
  const [selectedStartTime, setSelectedStartTime] = useState(formattedTime);
  const [selectedEndTime, setSelectedEndTime] = useState(formattedTime);

  const handleSubmit = async () => {
    // Perform form submission logic or validation here
    const token = await AsyncStorage.getItem("token");
    console.log("Submitted:", {
      formatedDate,
      selectedStartTime,
      selectedEndTime,
    });
    try {
      let data = JSON.stringify({
        availableTimes: {
          day: formatedDate,
          startTime: selectedStartTime,
          endTime: selectedEndTime,
        },
      });

      let config = {
        method: "patch",
        maxBodyLength: Infinity,
        url: "https://healthify-103r.onrender.com/api/v1/doctors/setAvailableTimes",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        data: data,
      };
      const response = await axios(config);
      alert("Work Times Have Been Scheduled");
    } catch (error) {
      alert(error.message);
    }
  };
  const handleStartTimeChange = (newTime) => {
    const hours = newTime.getHours().toString();
    const minutes = newTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;

    setStartTime(newTime);
    setSelectedStartTime(formattedTime);
    console.log(formattedTime);
  };
  const handleEndTimeChange = (newTime) => {
    const hours = newTime.getHours().toString();
    const minutes = newTime.getMinutes().toString().padStart(2, "0");
    const formattedTime = `${hours}:${minutes}`;
    // Use the formatted time as needed
    setEndTime(newTime);
    setSelectedEndTime(formattedTime);
    console.log(formattedTime); // Example: 19:30
  };
  useEffect(() => {
    setDate(initialSelectedDate);
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: MarginsAndPaddings.l,
        }}
      >
        <Title title="Set Work Times " width={200} height={35} />
      </View>
      <ScrollView style={styles.subContainer}>
        <View
          style={{
            marginTop: MarginsAndPaddings.l,
          }}
        >
          <Text style={styles.title}>Date:</Text>
          <DatePickerIOS
            mode="date"
            date={date}
            onDateChange={(val) => {
              const year = val.getFullYear().toString();
              const month = (val.getMonth() + 1).toString().padStart(2, "0");
              const day = val.getDate().toString().padStart(2, "0");

              const formattedDate = `${year}-${month}-${day}`;

              console.log(formattedDate); // Output: 2023-06-10
              setDate(val);
              setFormatedDate(formattedDate);
            }}
          />

          <Text style={styles.title}>Start Time:</Text>
          <DatePickerIOS
            mode="time"
            date={startTime}
            onDateChange={handleStartTimeChange}
          />

          <Text style={styles.title}>End Time:</Text>
          <DatePickerIOS
            mode="time"
            date={endTime}
            onDateChange={handleEndTimeChange}
          />
        </View>
      </ScrollView>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: MarginsAndPaddings.l,
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={handleSubmit}
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
              Submit
            </Text>
            {/* <Icon name="ios-calendar" size={18} color={COLORS.white} /> */}
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SetAvailbleTimesScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    width: "100%",
    backgroundColor: COLORS.white,
  },
  subContainer: {
    paddingHorizontal: MarginsAndPaddings.l,
  },
  title: {
    fontSize: 20,
    fontWeight: "500",
    marginVertical: MarginsAndPaddings.l,
    opacity: 0.7,
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
