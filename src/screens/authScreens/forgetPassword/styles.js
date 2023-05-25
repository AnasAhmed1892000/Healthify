import { MarginsAndPaddings } from "../../../values/dimensions";
import { StyleSheet } from "react-native";
export const styles = StyleSheet.create({
  contianer: {
    flex: 1,
    paddingVertical: MarginsAndPaddings.m,
  },
  LogoStyle: {
    justifyContent: "flex-start",
    alignItems: "center",
  },
  formStyle: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 65,
  },
});
