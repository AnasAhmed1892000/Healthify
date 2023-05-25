import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import DoctorEmr from "../../components/reusableComponents/DoctorEmr";
import Title from "../../components/reusableComponents/Title";
import { ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const MedicalRecordScreen = () => {
  const route = useRoute();
  const { appointmentID, doctorID } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const [loading, setLoading] = useState(true);
  const [responseByID, setResponseByID] = useState({});
  const [EMR, setEMR] = useState();
  const getAppointEMR = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/viewAppointmentEMR/${appointmentID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);

      setEMR(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  const getDoctorByid = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/viewDoctorByUserID/${doctorID}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      console.log(response.status);
      setResponseByID(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getAppointEMR();
    getDoctorByid();
  }, []);
  return (
    <SafeAreaView style={styles.container}>
      {EMR ? (
        <>
          <View
            style={{
              marginLeft: MarginsAndPaddings.xl,
              marginBottom: MarginsAndPaddings.l,
            }}
          >
            <Title title={"Medcial Records"} width={190} height={30} />
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <ScrollView>
                <View style={styles.subContainer}>
                  <DoctorEmr
                    name={responseByID.name}
                    speciality={responseByID.speciality}
                    updatedAt={EMR.updatedAt.split("T")[0]}
                    photo={responseByID.photo}
                  />
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.s,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        {
                          width: screenWidth / 1.1,
                          backgroundColor: COLORS.mianBlue,
                        },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                          color: COLORS.white,
                        }}
                      >
                        {EMR.createdAt.split("T")[0]} Consaltation Record
                      </Text>
                    </View>
                    <Divider width={1} />
                  </View>
                  <Text style={styles.title}>Daignose</Text>
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.l,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        { width: screenWidth / 1.1 },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                      >
                        {EMR.diagnosis}
                      </Text>
                    </View>
                  </View>
                  <Divider width={1} />
                  <Text style={styles.title}>Medication </Text>
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.l,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        { width: screenWidth / 1.1 },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                      >
                        {EMR.medication}
                      </Text>
                    </View>
                  </View>
                  <Divider width={1} />
                  <Text style={styles.title}>Dosage</Text>
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.l,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        { width: screenWidth / 1.1 },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                      >
                        {EMR.dosage}
                      </Text>
                    </View>
                  </View>
                  <Divider width={1} />
                  <Text style={styles.title}>Instructions</Text>
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.l,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        { width: screenWidth / 1.1 },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                      >
                        {EMR.instructions}
                      </Text>
                    </View>
                  </View>
                  <Divider width={1} />
                  <Text style={styles.title}>Notes</Text>
                  <View
                    style={{
                      marginTop: MarginsAndPaddings.l,
                    }}
                  >
                    <View
                      style={[
                        styles.inputContainer,
                        { width: screenWidth / 1.1 },
                      ]}
                    >
                      <Text
                        style={{
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                      >
                        {EMR.notes}
                      </Text>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </>
          )}
        </>
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default MedicalRecordScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: MarginsAndPaddings.s,
  },
  subContainer: {
    width: "100%",
    //  alignItems: "center",
    paddingHorizontal: MarginsAndPaddings.xl,
  },
  inputContainer: {
    borderRadius: BorderRadius.l,
    borderWidth: 1.2,
    borderColor: COLORS.lightGrey,
    marginVertical: MarginsAndPaddings.s,
  },
  title: {
    fontSize: 16,
    marginTop: MarginsAndPaddings.s,
  },
});
