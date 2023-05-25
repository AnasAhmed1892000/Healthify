import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DoctorEmr from "../../components/reusableComponents/DoctorEmr";
import { SafeAreaView } from "react-native";
import COLORS from "../../values/colors";
import { MarginsAndPaddings } from "../../values/dimensions";
import Title from "../../components/reusableComponents/Title";
import EMR from "../../components/reusableComponents/EMR";

const DoctorEmrScreen = () => {
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
        <DoctorEmr />
        <View
          style={{
            marginVertical: MarginsAndPaddings.ml,
          }}
        >
          <EMR />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default DoctorEmrScreen;

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
