import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
/*
 */
const Doctor = ({
  name,
  speciality,
  rating,
  reviews,
  destination,
  dailySchedule,
  id,
  favorite,
  uri,
}) => {
  const navigation = useNavigation();

  const [Favorite, setFavorite] = useState(favorite);

  const rateDoctor = async (rate) => {
    const token = await AsyncStorage.getItem("token");
    let data = {
      doctorID: id,
      rating: rate,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/rateDoctor",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      console.log(response.status);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const addFavouriteDoctor = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = {
      doctorID: id,
    };

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/addFavoriteDoctor",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      setFavorite(true);
      console.log(response.status);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const removeFavouriteDoctor = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = {
      doctorID: id,
    };

    let config = {
      method: "patch",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/removeFavoriteDoctor",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      setFavorite(false);
      console.log(response.status);
      console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.leftSubContainer}>
        <Image
          style={styles.Image}
          source={{
            uri: uri,
          }}
        />
      </View>
      <View style={styles.rightSubContainer}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: "700",
            marginVertical: MarginsAndPaddings.s,
            marginBottom: MarginsAndPaddings.s,
          }}
        >
          {name}
        </Text>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text
            style={{
              fontSize: 14,
              color: COLORS.mianBlue,
              fontWeight: "600",
            }}
          >
            {speciality}
          </Text>
          {favorite && Favorite ? (
            <TouchableOpacity onPress={() => removeFavouriteDoctor()}>
              <Icon name="heart" size={18} color={COLORS.red} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => addFavouriteDoctor()}>
              <Icon name="heart-outline" size={18} color={COLORS.heavyGrey} />
            </TouchableOpacity>
          )}
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* <AirbnbRating count={5} defaultRating={11} size={20} /> */}

          <AirbnbRating
            showRating={false}
            style={{ paddingVertical: 10 }}
            size={16}
            defaultRating={rating}
            onFinishRating={(value) => {
              rateDoctor(value);
            }}
          />
          <Text
            style={{
              fontSize: 8,
              paddingLeft: MarginsAndPaddings.s,
              paddingRight: MarginsAndPaddings.l,
            }}
          >
            ({reviews} reviews)
          </Text>
        </View>
        {destination == 1 ? (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              width: 150,
              height: 27,
              backgroundColor: COLORS.mianBlue,
              marginTop: MarginsAndPaddings.xl,

              borderRadius: BorderRadius.xl,
            }}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("DoctorProfile", {
                id,
                favorite,
              })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                View Profile
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              width: 150,
              height: 27,
              backgroundColor: COLORS.mianBlue,
              marginTop: MarginsAndPaddings.xl,

              borderRadius: BorderRadius.xl,
            }}
            activeOpacity={0.7}
            onPress={() =>
              navigation.navigate("Doctor", {
                name,
                speciality,
                rating,
                reviews,
                dailySchedule,
                id,
                favorite,
                uri,
              })
            }
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: COLORS.white,
                  fontSize: 12,
                  fontWeight: "600",
                }}
              >
                Schedule Appointment
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Doctor;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 345,
    height: 133,
    backgroundColor: COLORS.white,
    padding: MarginsAndPaddings.l,
    shadowColor: COLORS.alfaBlack,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    borderWidth: 1,
    borderColor: COLORS.XlightGrey,
    borderRadius: BorderRadius.l,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: MarginsAndPaddings.l,
    marginVertical: MarginsAndPaddings.s,
  },
  Image: {
    width: 155,
    height: 118,
    borderRadius: BorderRadius.l,
  },
  rightSubContainer: {
    flex: 1,
    marginLeft: MarginsAndPaddings.l,
    justifyContent: "flex-start",
  },
  leftSubContainer: { flex: 1, marginRight: MarginsAndPaddings.l },
});
