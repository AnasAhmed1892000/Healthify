import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import Title from "../../components/reusableComponents/Title";
import HeadChat from "../../components/reusableComponents/HeadChat";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Doctor from "../../components/reusableComponents/Doctor";
import COLORS from "../../values/colors";
import { MarginsAndPaddings } from "../../values/dimensions";
const ChatScreen = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState([]);
  const arr = [1, 2, 3, 4, 5, 6];
  const getFavouriteDoctors = async () => {
    const token = await AsyncStorage.getItem("token");

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/getFavoriteDoctors",
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
    getFavouriteDoctors();
  }, []);
  return (
    <SafeAreaView style={styles.contianer}>
      <Title title=" Favourites" seeAll={false} width={182} height={35} />
      {loading ? (
        <ActivityIndicator />
      ) : (
        <View style={{ marginTop: MarginsAndPaddings.l }}>
          <FlatList
            data={response}
            renderItem={({ item }) => (
              <Doctor
                name={item.name}
                speciality={item.speciality}
                id={item._id}
                rating={item.rate}
                reviews={item.ratingNum}
                favorite={true}
                uri={`https://healthify-103r.onrender.com/img/users/${item.photo}`}
                destination={1}
              />
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  contianer: {
    backgroundColor: COLORS.white,
    height: "100%",
  },
});
