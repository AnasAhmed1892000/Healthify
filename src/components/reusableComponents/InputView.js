import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
const W = Dimensions.get("window").width;
const H = Dimensions.get("window").height;
import { Input } from "react-native-elements";
import COLORS from "../../values/colors";
import Icon from "react-native-vector-icons/Entypo";
/*
 */
const InputView = ({
  loading,
  values,
  touched, //for onBlur Method
  errors,
  handelChange,
  handleBlur,
  name, // name of the field that gonna be accessed
  title,
  placeholder,
  secureTextEntry,
  containerStyling,
  titleStyling,
  type,
  ...porps
}) => {
  const [shown, setShown] = useState(false);

  const [secured, setSecured] = useState(
    name == "password" || name == "passwordConfirm" ? true : false
  );
  return (
    <View style={[styles.container, containerStyling]}>
      <Text style={titleStyling}>{title}</Text>
      <Input
        {...porps}
        placeholder={placeholder}
        autoCompleteType={"off"}
        disabled={false} //disabled ={loading ? true : flase}  => disables inputs while loading submits
        placeholderTextColor="#888888"
        textAlign="left"
        secureTextEntry={secured}
        value={values[name]}
        errorStyle={{
          color: COLORS.errorRed,
        }}
        errorMessage={touched[name] ? errors[name] : ""}
        inputStyle={{
          color: "#000",
          fontSize: 14,
          opacity: 0.7,
        }}
        inputContainerStyle={{
          ...styles.textInputStyle,
          borderColor:
            errors[name] && touched[name] ? COLORS.errorRed : "#888888",
        }}
        onChangeText={handelChange(name)}
        onBlur={handleBlur(name)}
      />
      <>
        {name == "password" || name == "passwordConfirm" ? (
          <>
            {shown == true ? (
              <View style={{ marginTop: 22, position: "absolute", right: 260 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSecured(true);
                    setShown(false);
                  }}
                >
                  <Icon name="eye" style={styles.icon} size={18} />
                </TouchableOpacity>
              </View>
            ) : (
              <View style={{ marginTop: 22, position: "absolute", right: 260 }}>
                <TouchableOpacity
                  onPress={() => {
                    setSecured(false);
                    setShown(true);
                  }}
                >
                  <Icon name="eye-with-line" style={styles.icon} size={18} />
                </TouchableOpacity>
              </View>
            )}
          </>
        ) : null}
      </>
    </View>
  );
};

export default InputView;

const styles = StyleSheet.create({
  container: {
    marginTop: 5,
    flexDirection: "row-reverse",
  },
  textInputStyle: {
    borderWidth: 1,
    borderRadius: 12,
    width: 300,
    height: 50,
    marginTop: H * 0.01,
    paddingLeft: W * 0.03,
    marginLeft: -40,
    lineHeight: 24,
    backgroundColor: "#fff",
    borderColor: "#525252",
    fontSize: 12,
    textAlign: "left",
  },
  icon: {
    width: 35,
    height: 25,

    marginLeft: -20,
    zIndex: 999,
  },
});
