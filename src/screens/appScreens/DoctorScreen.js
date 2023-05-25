import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useRef, useEffect } from "react";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import Title from "../../components/reusableComponents/Title";
import Doctor from "../../components/reusableComponents/Doctor";
import { useRoute } from "@react-navigation/native";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import Date from "../../components/reusableComponents/Date";
import Time from "../../components/reusableComponents/Time";
import GridFlatList from "grid-flatlist-react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

/*
 */
const DoctorScreen = () => {
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [responseByID, setResponseByID] = useState({});
  const route = useRoute();
  const {
    name,
    speciality,
    rating,
    reviews,
    dailySchedule,
    id,
    favorite,
    uri,
  } = route.params;
  const getDoctorByid = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/viewDoctorByID/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      const response = await axios(config);
      setResponseByID(response.data.data);
      console.log(responseByID);
      //console.log(response.data.data);
    } catch (error) {
      //console.log(error.message);
    }
  };
  useEffect(() => {
    if (dailySchedule.length === 0) {
      setEmpty(true);
    } else {
      setEmpty(false);
      getDoctorByid();
    }
  }, []);
  const phoneNumber = "12345678910";
  /* bottom sheet modal logic*/
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = ["25%"];
  const handleViewPress = (view) => {
    // select the view
    setSelectedMethod(view);
  };
  const handlePresentModal = () => {
    bottomSheetModalRef.current?.present();
    //setIsOpen(true);
  };
  const handleCloseModal = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = JSON.stringify({
      doctorID: id,
      date: selectedDate.split("T")[0],
      time: selectedAppointment,
      paymentMethod: selectedMethod,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/scheduleAppointment",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setLoading(false);
      bottomSheetModalRef.current?.close();
      if (response.data.status == "success" && selectedMethod == "card") {
        const url = response.data.data.session;

        Linking.canOpenURL(url)
          .then((supported) => {
            if (!supported) {
              console.log(`Can't handle url: ${url}`);
            } else {
              return Linking.openURL(url);
            }
          })
          .catch((err) => console.error("An error occurred", err));
      } else {
        navigation.navigate("Appointments");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }

    //setIsOpen(false);
  };
  const handleComponent = () => {
    <View></View>;
  };

  /**/
  const openDirections = () => {
    const clinicLocation = "123 Main St, City, State ZIP"; // Replace with your clinic's address
    const platform = Platform.OS === "ios" ? "ios" : "android"; // Get user's platform
    const url = Platform.select({
      ios: `http://maps.apple.com/?address=${clinicLocation}`,
      android: `http://maps.google.com/?daddr=${clinicLocation}`,
    });

    Linking.openURL(url);
  };
  const handleGetDirections = () => {
    const lat = responseByID.doctor.location.coordinates[0]; // replace with the latitude of the clinic
    const lng = responseByID.doctor.location.coordinates[1]; // replace with the longitude of the clinic
    const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;

    Linking.openURL(url);
  };

  const handlePhoneCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  const Appointments = [
    {
      date: "16 Jan",
      avilableAppointments: 15,
      id: 1,
    },
    {
      date: "16 Jan",
      avilableAppointments: 0,
      id: 2,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 3,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 4,
    },
    {
      date: "16 Jan",
      avilableAppointments: 0,
      id: 5,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 6,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 7,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 8,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 9,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 10,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 11,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 12,
    },
    {
      date: "16 Jan",
      avilableAppointments: 10,
      id: 13,
    },
  ];
  const timePlan = [
    {
      time: "7:00 AM",
      isAvailable: false,
      ID: 1,
    },
    {
      time: "8:00 AM",
      isAvailable: true,
      ID: 2,
    },
    {
      time: "9:00 AM",
      isAvailable: true,
      ID: 3,
    },
    {
      time: "10:00 AM",
      isAvailable: true,
      ID: 4,
    },
    {
      time: "11:00 AM",
      isAvailable: true,
      ID: 5,
    },
    {
      time: "12:00 PM",
      isAvailable: true,
      ID: 6,
    },
    {
      time: "1:00 PM",
      isAvailable: false,
      ID: 7,
    },
    {
      time: "2:00 PM",
      isAvailable: true,
      ID: 8,
    },
    {
      time: "3:00 PM",
      isAvailable: true,
      ID: 9,
    },
    {
      time: "4:00 PM",
      isAvailable: true,
      ID: 10,
    },
    {
      time: "5:00 PM",
      isAvailable: true,
      ID: 11,
    },
    {
      time: "6:00 PM",
      isAvailable: true,
      ID: 12,
    },
    {
      time: "7:00 PM",
      isAvailable: true,
      ID: 13,
    },
    {
      time: "8:00 PM",
      isAvailable: true,
      ID: 14,
    },
    {
      time: "9:00 PM",
      isAvailable: true,
      ID: 15,
    },
    {
      time: "10:00 PM",
      isAvailable: true,
      ID: 16,
    },
    {
      time: "11:00 PM",
      isAvailable: true,
      ID: 17,
    },
  ];

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleAppointmentSelect = (appointment) => {
    setSelectedAppointment(appointment);
  };
  const handleDateSelect = (date, index) => {
    setSelectedDate(date);
    setIndex(index);
  };

  const renderAppointment = (item) => {
    const isSelected = selectedAppointment === item;

    return (
      <TouchableOpacity
        onPress={() => handleAppointmentSelect(item)}
        disabled={isSelected}
      >
        <Time appointment={item} isAvailable={true} selected={isSelected} />
      </TouchableOpacity>
    );
  };
  const renderDate = ({ item, index }) => {
    if (!empty) {
      const { day, hourRange } = item;

      // console.log(index);

      const date = day.split("T")[0];
      //console.log(date);

      const isSelected = selectedDate === day;

      return (
        <TouchableOpacity
          onPress={() => handleDateSelect(day, index)}
          disabled={isSelected}
        >
          <Date
            date={date}
            appointments={hourRange.length}
            selected={isSelected}
          />
        </TouchableOpacity>
      );
    }
  };
  return (
    <View style={styles.container}>
      <Title title="Schedule Appointment With" width={300} height={35} />
      <Doctor
        name={name}
        speciality={speciality}
        rating={rating}
        reviews={reviews}
        destination={1}
        id={id}
        favorite={favorite}
        uri={uri}
      />
      {empty ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: COLORS.heavyGrey,
              fontSize: 24,
              alignSelf: "center",
              lineHeight: 40,
              textAlign: "center",
            }}
          >
            We Are Very Sorry {name} Has No Appointments{" "}
          </Text>
        </View>
      ) : (
        <>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: MarginsAndPaddings.ml,
                marginTop: MarginsAndPaddings.l,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.heavyGrey,
                }}
              >
                Select Date{" "}
              </Text>
            </View>
            <FlatList
              data={dailySchedule}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({ item, index }) => renderDate({ item, index })}
            />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: MarginsAndPaddings.ml,
                marginTop: -20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: COLORS.heavyGrey,
                }}
              >
                Select Time{" "}
              </Text>
            </View>
            <GridFlatList
              data={
                dailySchedule.length === 0
                  ? null
                  : dailySchedule[index].hourRange
              }
              renderItem={renderAppointment}
              numColumns={3}
              style={styles.subContainer1}
            />
          </View>
          <View style={{}}>
            <LinearGradient
              style={styles.subContainer2}
              colors={["#FFFFFF", "#808080"]}
            >
              <View style={styles.subContainer3}>
                <View style={styles.btn}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={handlePresentModal}
                    disabled={
                      selectedAppointment && selectedDate ? false : true
                    }
                  >
                    <Text
                      style={{
                        marginRight: MarginsAndPaddings.l,
                        fontSize: 18,
                        color: COLORS.white,
                        fontWeight: "600",
                      }}
                    >
                      Book Appointment
                    </Text>
                    <Icon name="ios-calendar" size={18} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => handlePhoneCall()}
                  >
                    <Text
                      style={{
                        marginRight: MarginsAndPaddings.l,
                        fontSize: 18,
                        color: COLORS.white,
                        fontWeight: "600",
                      }}
                    >
                      Contact clinic
                    </Text>
                    <Icon name="call-outline" size={18} color={COLORS.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.btn}>
                  <TouchableOpacity
                    style={{ flexDirection: "row", alignItems: "center" }}
                    onPress={() => handleGetDirections()}
                  >
                    <Text
                      style={{
                        marginRight: MarginsAndPaddings.l,
                        fontSize: 18,
                        color: COLORS.white,
                        fontWeight: "600",
                      }}
                    >
                      Get Direction
                    </Text>
                    <Icon
                      name="location-outline"
                      size={18}
                      color={COLORS.white}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </LinearGradient>
          </View>
          <BottomSheetModalProvider>
            <BottomSheetModal
              ref={bottomSheetModalRef}
              index={0}
              snapPoints={snapPoints}
              onDismiss={() => setIsOpen(false)}
              handleComponent={handleComponent}
            >
              <View style={styles.contentContainer}>
                <View
                  style={{
                    marginTop: MarginsAndPaddings.l,
                    marginBottom: -25,
                  }}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 18,
                      fontWeight: "800",
                    }}
                  >
                    Payment Method
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: 35,
                    paddingLeft: 0,
                  }}
                >
                  <TouchableOpacity onPress={() => handleViewPress("card")}>
                    <View
                      style={[
                        styles.paymentContainer,
                        selectedMethod === "card" && styles.selectedView,
                      ]}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {" "}
                        Credit/Debit card{" "}
                      </Text>
                      <Icon name="card" size={20} />
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleViewPress("cash")}>
                    <View
                      style={[
                        styles.paymentContainer,
                        selectedMethod === "cash" && styles.selectedView,
                      ]}
                    >
                      <Text style={{ fontSize: 16, fontWeight: "400" }}>
                        {" "}
                        Cash{" "}
                      </Text>
                      <Icon name="cash" size={20} />
                    </View>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={{
                    width: 150,
                    height: 40,
                    borderRadius: 35,
                    borderWidth: 1,
                    borderColor: COLORS.white,
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: MarginsAndPaddings.ml,
                  }}
                  disabled={selectedMethod ? false : true}
                  onPress={handleCloseModal}
                >
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Confirm
                  </Text>
                </TouchableOpacity>
                {loading ? (
                  <View style={{ marginTop: MarginsAndPaddings.l }}>
                    <ActivityIndicator color={COLORS.white} />
                  </View>
                ) : null}
              </View>
            </BottomSheetModal>
          </BottomSheetModalProvider>
        </>
      )}
    </View>
  );
};

export default DoctorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingHorizontal: MarginsAndPaddings.l,
    paddingTop: MarginsAndPaddings.l,
  },
  subContainer1: {
    height: "35%",
    marginRight: MarginsAndPaddings.l,
  },
  subContainer2: {
    height: 215,
    width: 500,
    marginLeft: -15,
    marginRight: MarginsAndPaddings.l,
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    height: 46,
    width: 250,
    backgroundColor: COLORS.blue,
    alignItems: "center",
    justifyContent: "center",
    marginTop: MarginsAndPaddings.l,
    borderRadius: BorderRadius.l,
  },
  subContainer3: {
    marginTop: MarginsAndPaddings.l,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 100,
    paddingBottom: MarginsAndPaddings.ml,
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    backgroundColor: COLORS.blue,
    borderTopLeftRadius: BorderRadius.ml,
    borderTopRightRadius: BorderRadius.ml,
  },
  selectedView: {
    borderColor: COLORS.heavyGrey,
    borderWidth: 2,
  },
  paymentContainer: {
    width: 175,
    flexDirection: "row",
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 45,
    marginHorizontal: MarginsAndPaddings.s,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
