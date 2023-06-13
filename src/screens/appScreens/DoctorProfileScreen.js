import {
  StyleSheet,
  Text,
  View,
  Image,
  Touchable,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { Divider } from "react-native-elements";
import React, { useState, useCallback, useEffect } from "react";
import COLORS from "../../values/colors";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import Icon from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import { Rating, AirbnbRating } from "react-native-ratings";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
const DoctorProfileScreen = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { id, favorite } = route.params;
  const [Favorite, setFavorite] = useState(favorite);
  const [loading, setLoading] = useState(true);
  const [responseByID, setResponseByID] = useState({});

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
    } catch (error) {
      console.log(error.message);
    }
  };
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
      setLoading(true);
      const response = await axios(config);
      setResponseByID(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDoctorByid();
  }, []);
  return (
    <SafeAreaView style={styles.background}>
      {loading ? null : (
        <>
          <View style={styles.container}>
            <View style={{ flexDirection: "row" }}>
              <View style={styles.leftSubContainer}>
                <Image
                  style={styles.Image}
                  source={{
                    uri: `https://healthify-103r.onrender.com/img/users/${responseByID.doctor.photo}`,
                  }}
                />
              </View>
              <View style={styles.rightSubContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "700",
                    marginVertical: MarginsAndPaddings.s,
                    marginBottom: MarginsAndPaddings.s,
                  }}
                >
                  {responseByID.doctor.name}
                </Text>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: COLORS.mianBlue,
                      fontWeight: "600",
                    }}
                  >
                    {responseByID.doctor.speciality}
                  </Text>
                  {Favorite ? (
                    <TouchableOpacity onPress={() => removeFavouriteDoctor()}>
                      <Icon name="heart" size={18} color={COLORS.red} />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity onPress={() => addFavouriteDoctor()}>
                      <Icon
                        name="heart-outline"
                        size={18}
                        color={COLORS.heavyGrey}
                      />
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
                    defaultRating={responseByID.doctor.rate}
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
                    ({responseByID.doctor.ratingNum} reviews)
                  </Text>
                </View>
              </View>
            </View>
            <View style={{ width: "100%" }}>
              <Divider
                width={1}
                style={{ marginVertical: MarginsAndPaddings.l }}
                color={COLORS.lightGrey}
              />
            </View>
            <View
              style={{
                alignItems: "flex-start",
                width: "100%",
                paddingLeft: MarginsAndPaddings.l,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <AntDesign
                  name="exclamationcircleo"
                  style={{ marginVertical: MarginsAndPaddings.l }}
                  size={20}
                  color={COLORS.lightBlue}
                />
                <Text
                  style={{
                    paddingLeft: MarginsAndPaddings.s,
                    fontSize: 16,
                    fontWeight: "500",
                  }}
                >
                  About
                </Text>
              </View>
              <Text>
                Lorem ipsum dolor sit amet. Sed optio distinctio et eaque quos
                sit fuga tenetur et laudantium accusantium eos voluptate
                doloremque. Et praesentium molestiae At blanditiis ducimus eum
                minus sint. Qui mollitia earum aut praesentium molestiae eum
                sint modi eos repellendus voluptate. Ea modi consequatur ex
                placeat accusantium sit debitis dolorem est porro quaerat ea
                voluptates optio et voluptatum veniam quo quis autem. Et maxime
                velit quo error sequi id
              </Text>
            </View>
            <View style={{ width: "100%" }}>
              <Divider
                width={1}
                style={{ marginVertical: MarginsAndPaddings.l }}
                color={COLORS.lightGrey}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                width: "100%",
                paddingLeft: MarginsAndPaddings.l,
                flexDirection: "row",
              }}
            >
              <Icon
                name="ios-location-outline"
                style={{ marginVertical: MarginsAndPaddings.l }}
                size={20}
                color={COLORS.lightBlue}
              />
              <Text
                style={{
                  paddingLeft: MarginsAndPaddings.s,
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Adress
              </Text>
            </View>
            <Text
              style={{
                paddingLeft: MarginsAndPaddings.l,
              }}
            >
              Lorem ipsum dolor sit amet. Sed optio
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              width: "100%",
              marginTop: MarginsAndPaddings.ml,
              paddingHorizontal: MarginsAndPaddings.ml,
              justifyContent: "space-around",
            }}
          >
            <View style={styles.square}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Consultation Fee
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.lightBlue,
                    fontWeight: "500",
                  }}
                >
                  200
                </Text>
                <Icon name="cash" size={16} color={COLORS.lightBlue} />
              </View>
            </View>
            <View style={styles.square}>
              <Text style={{ fontSize: 16, fontWeight: "500" }}>
                Waiting time
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  justifyContent: "space-around",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: COLORS.lightBlue,
                    fontWeight: "500",
                  }}
                >
                  30
                </Text>
                <AntDesign
                  name="clockcircleo"
                  size={16}
                  color={COLORS.lightBlue}
                />
              </View>
            </View>
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default DoctorProfileScreen;

const styles = StyleSheet.create({
  container: {
    width: 345,

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
  background: {
    backgroundColor: COLORS.white,
    height: "100%",
    alignItems: "center",
  },
  square: {
    width: 150,
    height: 60,
    borderWidth: 1,
    borderRadius: BorderRadius.l,
    borderColor: COLORS.lightBlue,
    justifyContent: "space-evenly",
    alignItems: "center",
  },
});
