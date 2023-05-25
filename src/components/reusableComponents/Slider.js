import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Button,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import COLORS from "../../values/colors";
const Slider = () => {
  const modalizeRef = useRef(null);

  const handleClose = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.close(dest);
    }
  };
  const onOpen = (dest) => {
    if (modalizeRef.current) {
      modalizeRef.current.open(dest);
    }
  };
  const renderContent = () => (
    <View style={s.content}>
      <Text style={s.content__subheading}>{"Introduction".toUpperCase()}</Text>
      <Text style={s.content__heading}>Always open modal!</Text>

      <Button
        title="Close to initial position"
        onPress={() => handleClose("alwaysOpen")}
        color={COLORS.white}
      />
      <Button
        title="Close completely"
        color={COLORS.white}
        onPress={handleClose}
      />
    </View>
  );

  return (
    <>
      <View>
        <GestureHandlerRootView>
          <Modalize
            ref={modalizeRef}
            modalStyle={s.content__modal}
            alwaysOpen={15}
            handlePosition="outside"
            snapPoint={300}
          >
            {renderContent()}
          </Modalize>
        </GestureHandlerRootView>
      </View>
    </>
  );
};

const s = StyleSheet.create({
  content: {
    padding: 20,
    backgroundColor: COLORS.blue,
    flex: 1,
    height: 750,
  },

  content__modal: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
  },

  content__subheading: {
    marginBottom: 2,

    fontSize: 16,
    fontWeight: "600",
    color: "#ccc",
  },

  content__heading: {
    fontSize: 24,
    fontWeight: "600",
    color: "#333",
  },

  content__description: {
    paddingTop: 10,
    paddingBottom: 10,

    fontSize: 15,
    fontWeight: "200",
    lineHeight: 22,
    color: "#666",
  },
});

export default Slider;
