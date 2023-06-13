import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import DateTimePicker from "@react-native-community/datetimepicker";
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
const MedicineRemindersScreen = () => {
  const [medicineName, setMedicineName] = useState("");
  const [dosage, setDosage] = useState("");
  const [time, setTime] = useState("");
  const [repeatPeriod, setRepeatPeriod] = useState("");
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const handleTimeChange = (event, date) => {
    setShowTimePicker(false);
    if (date) {
      setSelectedTime(date);
    }
  };

  const showPicker = () => {
    setShowTimePicker(true);
  };
  const getPermission = async () => {
    try {
      if (Constants.isDevice) {
        const { status: existingStatus } =
          await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          alert("Enable push notifications to use the app!");
          await AsyncStorage.setItem("expopushtoken", "");
          return;
        }
        const token = (await Notifications.getExpoPushTokenAsync()).data;
        await AsyncStorage.setItem("expopushtoken", token);
      } else {
        alert("Must use physical device for Push Notifications");
      }
    } catch (error) {
      alert(error.message);
      console.log(error.message);
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }
  };
  useEffect(() => {
    getPermission();
    try {
      notificationListener.current =
        Notifications.addNotificationReceivedListener((notification) => {
          setNotification(notification);
        });

      responseListener.current =
        Notifications.addNotificationResponseReceivedListener((response) => {});

      return () => {
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
        Notifications.removeNotificationSubscription(responseListener.current);
      };
    } catch (error) {
      alert(error.message);
    }
  }, []);
  const onClick = async () => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Medicine Reminder",
        body: `Take ${dosage} of ${medicineName}`,
      },
      trigger: {
        hour: selectedTime.getHours(),
        minute: selectedTime.getMinutes(),
        repeats: true,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.label}>Medicine Name:</Text>
        <TextInput
          style={styles.input}
          value={medicineName}
          onChangeText={(text) => setMedicineName(text)}
          placeholder="Enter medicine name"
          placeholderTextColor={COLORS.lightGrey2}
        />

        <Text style={styles.label}>Dosage:</Text>
        <TextInput
          style={styles.input}
          value={dosage}
          onChangeText={(text) => setDosage(text)}
          placeholder="Enter dosage"
          placeholderTextColor={COLORS.lightGrey2}
        />

        <Text style={styles.label}>Time:</Text>
        <TextInput
          style={styles.input}
          value={
            selectedTime.getHours().toString() +
            ":" +
            selectedTime.getMinutes().toString().padStart(2, "0")
          }
          editable={false}
          //   placeholder="Enter time"
          placeholderTextColor={COLORS.lightGrey2}
          onPressIn={() => {
            showPicker();
          }}
        />
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="spinner"
            onChange={handleTimeChange}
          />
        )}
        <Text style={styles.label}>Repeat Period:</Text>
        <TextInput
          style={styles.input}
          value={repeatPeriod}
          onChangeText={(text) => setRepeatPeriod(text)}
          placeholder="Enter repeat period"
          placeholderTextColor={COLORS.lightGrey2}
        />

        <Button title="Schedule Reminder" onPress={onClick} />
      </View>
    </SafeAreaView>
  );
};

export default MedicineRemindersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: MarginsAndPaddings.ml,
  },
  subContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    paddingTop: MarginsAndPaddings.ml,
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1FADFF",
    marginVertical: MarginsAndPaddings.ml,
  },
  input: {
    height: 40,
    width: "100%",
    paddingHorizontal: 10,
  },
});
