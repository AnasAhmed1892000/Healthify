import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import Ruler from "react-native-animated-ruler";
import { BorderRadius, MarginsAndPaddings } from "../../values/dimensions";
import COLORS from "../../values/colors";
import Icon from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import ModalComponent from "../../components/reusableComponents/Modal";
import { useDispatch } from "react-redux";
import BMI from "../../../redux/bmi/BMISlice";

/*
 */

const BMIScreen = () => {
  var screenWidth = Dimensions.get("window").width;
  var screenHeight = Dimensions.get("window").height;
  const dispatch = useDispatch();
  const [selectedView, setSelectedView] = useState(null);
  const [counter, setCounter] = useState(0);
  const handleViewPress = (view) => {
    if (selectedView === view) {
      // unselect the view if it's already selected
      setSelectedView(null);
    } else {
      // select the view
      setSelectedView(view);
    }
  };
  return (
    <BottomSheetModalProvider>
      <View style={styles.container}>
        <Text style={{ fontSize: 24, fontWeight: "600" }}>BMI Calculator</Text>
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <View
            style={{
              flexDirection: "row",
              marginVertical: MarginsAndPaddings.l,
            }}
          >
            <TouchableOpacity onPress={() => handleViewPress("male")}>
              <View
                style={[
                  styles.genderContainer,
                  selectedView === "male" && styles.selectedView,
                ]}
              >
                <Icon name="male" size={45} color={COLORS.orange} />
                <Text style={styles.gender}>Male</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleViewPress("female")}>
              <View
                style={[
                  styles.genderContainer,
                  selectedView === "female" && styles.selectedView,
                ]}
              >
                <Icon name="female" size={45} color={COLORS.pink2} />
                <Text style={styles.gender}>Female</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.title}>Height in (cm)</Text>
          <Ruler
            style={{
              borderWidth: 1,
              borderRadius: BorderRadius.l,
              borderColor: COLORS.lightGrey,
              marginRight: MarginsAndPaddings.ml,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.white,
              elevation: 3,
            }}
            width={screenWidth / 1.17}
            height={170}
            vertical={false}
            onChangeValue={(value) => dispatch(BMI.setHeight(value))}
            minimum={100}
            maximum={200}
            segmentWidth={2}
            segmentSpacing={20}
            indicatorColor="#FF0000"
            indicatorWidth={100}
            indicatorHeight={80}
            indicatorBottom={20}
            step={10}
            stepColor="#333333"
            stepHeight={40}
            normalColor="#999999"
            normalHeight={20}
            backgroundColor="#FFFFFF"
            numberFontFamily="System"
            numberSize={40}
            numberColor="#000000"
            unit="cm"
            unitBottom={20}
            unitFontFamily="System"
            unitColor="#888888"
            unitSize={16}
          />
        </View>
        <View
          style={{
            alignItems: "flex-start",
            justifyContent: "center",
            marginTop: MarginsAndPaddings.l,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              marginVertical: MarginsAndPaddings.l,
              alignItems: "flex-end",
            }}
          >
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={styles.title}>Weight in (kg)</Text>
              <Ruler
                style={{
                  borderWidth: 1,
                  borderRadius: BorderRadius.l,
                  borderColor: COLORS.lightGrey,
                  marginRight: MarginsAndPaddings.ml,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: COLORS.white,
                  elevation: 3,
                }}
                width={150}
                height={150}
                vertical={false}
                onChangeValue={(value) => dispatch(BMI.setWeight(value))}
                minimum={50}
                maximum={200}
                segmentWidth={2}
                segmentSpacing={20}
                indicatorColor="#FF0000"
                indicatorWidth={100}
                indicatorHeight={80}
                indicatorBottom={20}
                step={10}
                stepColor="#333333"
                stepHeight={40}
                normalColor="#999999"
                normalHeight={20}
                backgroundColor="#FFFFFF"
                numberFontFamily="System"
                numberSize={40}
                numberColor="#000000"
                unit="kg"
                unitBottom={20}
                unitFontFamily="System"
                unitColor="#888888"
                unitSize={16}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={styles.title}>Age</Text>
              <View style={[styles.genderContainer, { flexDirection: "row" }]}>
                <TouchableOpacity
                  onPress={() => setCounter(counter - 1)}
                  style={{ marginRight: MarginsAndPaddings.ml }}
                  disabled={counter == 0 ? true : false}
                >
                  <Feather name="minus-square" size={24} />
                </TouchableOpacity>
                <Text style={{ fontSize: 24, fontWeight: "600" }}>
                  {counter}
                </Text>
                <TouchableOpacity
                  onPress={() => setCounter(counter + 1)}
                  style={{ marginLeft: MarginsAndPaddings.ml }}
                >
                  <Feather name="plus-square" size={24} />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <ModalComponent />
      </View>
    </BottomSheetModalProvider>
  );
};

export default BMIScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingLeft: MarginsAndPaddings.ml,
    backgroundColor: COLORS.white,
  },
  genderContainer: {
    width: 150,
    height: 150,
    borderWidth: 1,
    borderRadius: BorderRadius.l,
    borderColor: COLORS.lightGrey,
    marginRight: MarginsAndPaddings.ml,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.white,
  },
  gender: {
    fontSize: 24,
  },
  selectedView: {
    borderColor: COLORS.alfaBlack,
  },
  title: {
    fontSize: 16,
    paddingVertical: MarginsAndPaddings.s,
    fontWeight: "500",
  },
});
