import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import { useRef, useState } from "react";

import COLORS from "../../values/colors";
import { BorderRadius } from "../../values/dimensions";
import HalfCircleClipper from "./HalfCircleClipper ";
import { selectWeight, selectheight } from "../../../redux/bmi/BMISlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
/*
 */
const ModalComponent = () => {
  const select = useSelector;
  const [isOpen, setIsOpen] = useState(false);
  const [bmi, setBmi] = useState(0);
  var weight = select(selectWeight);
  var height = select(selectheight);
  const bottomSheetModalRef = useRef(null);

  const snapPoints = ["18%", "50%"];
  useEffect(() => {
    handlePresentModal();
  }, [isOpen]);

  function handlePresentModal() {
    bottomSheetModalRef.current?.present();
    setTimeout(() => {
      setIsOpen(true);
    }, 100);
  }
  const handleComponent = () => {
    <View></View>;
  };
  const handleButtonPress = async () => {
    const token = await AsyncStorage.getItem("token");
    let data = {
      weight: weight,
      height: height,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://healthify-103r.onrender.com/api/v1/patients/calculateMyBMI",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };
    try {
      const response = await axios(config);
      setBmi(response.data.data.bmi);

      bottomSheetModalRef.current?.expand();
    } catch (error) {
      console.log(error.message, data);
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={[]}>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onDismiss={() => setIsOpen(false)}
          handleComponent={handleComponent}
          handleIndicatorStyle={{ display: "none" }}
        >
          <View style={styles.contentContainer}>
            <HalfCircleClipper />
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: COLORS.black,
                position: "absolute",
                top: -30,
                right: 162,
                zIndex: 999,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TouchableOpacity onPress={handleButtonPress}>
                <Text
                  style={{
                    color: COLORS.white,
                    fontSize: 16,
                    fontWeight: "600",
                  }}
                >
                  BMI
                </Text>
              </TouchableOpacity>
            </View>
            <Text
              style={{
                color: COLORS.white,
                fontSize: 24,
                fontWeight: "600",
              }}
            >
              {bmi.toFixed(2)} Kg/M²
            </Text>
          </View>
        </BottomSheetModal>
      </View>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    alignItems: "center",
    justifyContent: "center",
    paddingTop: 15,
    overflow: "visible",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 15,
    backgroundColor: COLORS.blue,
    borderTopLeftRadius: BorderRadius.ml,
    borderTopRightRadius: BorderRadius.ml,
    marginTop: 35,
    overflow: "visible",
  },
  row: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
  },
  title: {
    fontWeight: "900",
    letterSpacing: 0.5,
    fontSize: 16,
  },
  subtitle: {
    color: "#101318",
    fontSize: 14,
    fontWeight: "bold",
  },
  description: {
    color: "#56636F",
    fontSize: 13,
    fontWeight: "normal",
    width: "100%",
  },
});

export default ModalComponent;
