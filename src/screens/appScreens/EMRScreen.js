import { StyleSheet, Text, View, SafeAreaView, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import DoctorEmr from "../../components/reusableComponents/DoctorEmr";
import Title from "../../components/reusableComponents/Title";
import { MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import EMR from "../../components/reusableComponents/EMR";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const EMRScreen = () => {
  const [loading, setLoading] = useState(false);
  const [respose, setResponse] = useState([]);
  const getEMRS = async () => {
    const token = await AsyncStorage.getItem("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/viewMyEMRs/",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      setLoading(true);
      const response = await axios(config);
      setResponse(response.data.data);

      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };
  useEffect(() => {
    getEMRS();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          marginLeft: MarginsAndPaddings.xl,
          marginBottom: MarginsAndPaddings.l,
        }}
      >
        <Title title={"Medcial Records"} width={190} height={30} />
      </View>
      <View style={styles.subContainer}>
        <View
          style={{
            marginVertical: MarginsAndPaddings.ml,
          }}
        >
          <FlatList
            data={respose}
            renderItem={({ item }) => (
              <EMR
                title={item.createdAt.split("T")[0]}
                appointmentID={item.appointment}
                doctorID={item.doctor}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EMRScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.white,
    paddingHorizontal: MarginsAndPaddings.s,
  },
  subContainer: {
    width: "100%",
    alignItems: "center",
  },
});
