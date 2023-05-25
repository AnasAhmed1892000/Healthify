import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import { useNavigation } from "@react-navigation/native";
const DoctorEmr = ({ name, speciality, updatedAt, photo }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.speciality}>{speciality}</Text>
        <Text style={styles.date}>Last Updated at: </Text>
        <Text style={styles.date}>{updatedAt} </Text>
      </View>
      <View style={styles.image}>
        <Image
          source={{
            uri: `https://healthify-103r.onrender.com/img/users/${photo}`,
          }}
          resizeMode="stretch"
          style={{
            width: 110,
            height: 130,
            overflow: "hidden",
            justifyContent: "center",
            borderRadius: BorderRadius.l,
          }}
        />
      </View>
    </View>
  );
};

export default DoctorEmr;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 340,
    borderWidth: 1.3,
    height: 150,
    borderColor: COLORS.lightGrey2,
    borderRadius: BorderRadius.l,
    marginTop: MarginsAndPaddings.l,
    marginVertical: MarginsAndPaddings.l,
    paddingHorizontal: MarginsAndPaddings.s,
    paddingVertical: MarginsAndPaddings.s,
    justifyContent: "space-between",
  },
  name: {
    fontSize: 20,
    fontWeight: "600",
    marginVertical: MarginsAndPaddings.s,
    marginLeft: MarginsAndPaddings.l,
  },
  speciality: {
    fontSize: 16,
    marginVertical: MarginsAndPaddings.s,
    marginLeft: MarginsAndPaddings.l,
    color: COLORS.heavyGrey,
  },
  date: {
    fontSize: 16,
    marginVertical: MarginsAndPaddings.s,
    marginLeft: MarginsAndPaddings.l,
  },
  image: {
    width: 112,
    height: 132,
    borderWidth: 1,
    borderColor: COLORS.mianBlue,
    borderRadius: BorderRadius.l,
  },
});
