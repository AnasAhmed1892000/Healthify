import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  FlatList,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import DetailedSearchBar from "../../components/reusableComponents/DetailedSearchBar";
import COLORS from "../../values/colors";
import { MarginsAndPaddings } from "../../values/dimensions";
import Doctor from "../../components/reusableComponents/Doctor";
import {
  selectIsSpecialityFound,
  selectSpeciality,
  selectResponse,
} from "../../../redux/search/searchSlice";
import { useSelector } from "react-redux";
import Title from "../../components/reusableComponents/Title";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { selectIsLoading } from "../../../redux/loading/LoadingSlice";

/*
 */
const SearchScreen = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const select = useSelector;
  const spec = select(selectSpeciality);
  const isLoading = select(selectIsLoading);
  const response = select(selectResponse);

  const getDoctorsBySpeciality = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Access Denied", "You Should Enable Location Permession", [
          { text: "OK" },
        ]);
      }
      const location = await Location.getCurrentPositionAsync({});
      var { latitude, longitude } = location.coords;
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
    const token = await AsyncStorage.getItem("token");
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `https://healthify-103r.onrender.com/api/v1/patients/searchDoctorsBySpeciality/${spec}/${latitude},${longitude}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const response = await axios(config);
      setDoctors(response.data.data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (spec) {
      getDoctorsBySpeciality();
    }
  }, [spec]);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View
          style={{
            marginLeft: MarginsAndPaddings.l,
          }}
        >
          <DetailedSearchBar />
        </View>
        <View
          style={{
            marginLeft: MarginsAndPaddings.l,
          }}
        >
          <Title
            title="Search Results"
            seeAll={false}
            width={193}
            height={35}
          />
        </View>
        <View
          style={{
            marginLeft: MarginsAndPaddings.l,
            marginTop: MarginsAndPaddings.xxl,
            paddingBottom: 210,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {loading || isLoading ? (
            <View
              style={{
                justifyContent: "center",
                marginLeft: 150,
              }}
            >
              <ActivityIndicator size={18} color={COLORS.lightBlue} />
            </View>
          ) : (
            <FlatList
              data={spec ? doctors : response}
              renderItem={(item) => (
                <Doctor
                  name={item.item.name}
                  speciality={item.item.speciality}
                  rating={item.item.rate}
                  reviews={item.item.ratingNum}
                  destination={0}
                  dailySchedule={item.item.availableTimes}
                  id={item.item._id}
                  favorite={item.item.favorite}
                  uri={`https://healthify-103r.onrender.com/img/users/${item.item.photo}`}
                />
              )}
              keyExtractor={(item) => item._id}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: "center",
  },
});
