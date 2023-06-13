import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Dimensions,
  ActivityIndicator,
  Button,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import DoctorEmr from "../../components/reusableComponents/DoctorEmr";
import Title from "../../components/reusableComponents/Title";
import { ScrollView } from "react-native";
import { Divider } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const DocEMRScreen = () => {
  const route = useRoute();
  const { name, photo, id } = route.params;

  const screenWidth = Dimensions.get("window").width;
  const [edit, setEdit] = useState(false);
  const [hasEMR, setHasEMR] = useState(null);
  const [loading, setLoading] = useState(true);
  /* EMR Details */
  const [createdAt, setCreatedAt] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [dosage, setDosage] = useState("");
  const [instructions, setInstructions] = useState("");
  const [medication, setMedication] = useState("");
  const [notes, setNotes] = useState("");
  const [updatedAt, setUpdatedAt] = useState("");
  /**/
  const [EMR, setEMR] = useState({});
  const getAppointEMR = async () => {
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/doctors/viewPatientEMR/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setHasEMR(true);
      setDiagnosis(response.data.data.diagnosis);
      setDosage(response.data.data.dosage);
      setInstructions(response.data.data.instructions);
      setMedication(response.data.data.medication);
      setNotes(response.data.data.notes);
      setCreatedAt(response.data.data.createdAt.split("T")[0]);
      setUpdatedAt(response.data.data.updatedAt.split("T")[0]);
      setEMR(response.data.data);
      setLoading(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        console.log("Bad Request:", error.response.status);
        setHasEMR(false);
      } else {
        console.log("Error:", error.message);
        // Handle other errors
      }
      setLoading(false);
    }
  };
  const createEMR = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = JSON.stringify({
      appointmentID: id,
      diagnosis: diagnosis,
      medication: medication,
      dosage: dosage,
      instructions: instructions,
      notes: notes,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/doctors/createPatientEMR/",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  const updateEMR = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = JSON.stringify({
      appointmentID: id,
      diagnosis: diagnosis,
      medication: medication,
      dosage: dosage,
      instructions: instructions,
      notes: notes,
    });

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/doctors/updatePatientEMR",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
      alert(error.message);
    }
  };

  useEffect(() => {
    getAppointEMR();
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
            <Title title={"Medcial Record"} width={190} height={30} />
          </View>
          <View
            style={{
              position: "absolute",
              right: 20,
              top: 60,
            }}
          >
            <Button
              title={"Edit EMR"}
              onPress={() => setEdit(true)}
              disabled={edit}
            />
          </View>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <ScrollView
                style={{
                  paddingBottom: 120,
                }}
              >
                <View style={styles.subContainer}>
                  <DoctorEmr
                    name={name}
                    speciality={"Patient"}
                    updatedAt={updatedAt}
                    photo={photo}
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
                        {createdAt} Consaltation Record
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
                      <TextInput
                        style={{
                          borderWidth: 0,
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                        onChangeText={(val) => setDiagnosis(val)}
                        value={diagnosis}
                        editable={edit}
                      />
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
                      <TextInput
                        style={{
                          borderWidth: 0,
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                        onChangeText={(val) => setMedication(val)}
                        value={medication}
                        editable={edit}
                      />
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
                      <TextInput
                        style={{
                          borderWidth: 0,
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                        onChangeText={(val) => setDosage(val)}
                        value={dosage}
                        editable={edit}
                      />
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
                      <TextInput
                        style={{
                          borderWidth: 0,
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                        onChangeText={(val) => setInstructions(val)}
                        value={instructions}
                        editable={edit}
                      />
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
                      <TextInput
                        style={{
                          borderWidth: 0,
                          marginVertical: MarginsAndPaddings.l,
                          marginHorizontal: MarginsAndPaddings.l,
                        }}
                        onChangeText={(val) => setNotes(val)}
                        value={notes}
                        editable={edit}
                      />
                    </View>
                  </View>
                  {edit ? (
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => {
                        setEdit(false);
                        if (hasEMR) {
                          updateEMR();
                        } else {
                          createEMR();
                        }
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
                          Submit
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ) : null}
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

export default DocEMRScreen;

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
