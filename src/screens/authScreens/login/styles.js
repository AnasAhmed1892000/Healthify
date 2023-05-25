import { StyleSheet, Keyboard } from "react-native";
import COLORS from "../../../values/colors";
import { MarginsAndPaddings } from "../../../values/dimensions";
import { BorderRadius } from "../../../values/dimensions";

const styles = StyleSheet.create({
  container: {
    flex: 1,

    paddingTop: 0,
    paddingHorizontal: MarginsAndPaddings.m,
  },
  titleContainer: {
    marginTop: MarginsAndPaddings.xxl,
    paddingTop: MarginsAndPaddings.xxl,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    backgroundColor: COLORS.blue,
    height: 45,
    borderRadius: BorderRadius.s,
    marginHorizontal: MarginsAndPaddings.m,
    alignItems: "center",
    justifyContent: "center",
  },
  line: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: MarginsAndPaddings.xxxl,
    width: 250,
  },
  fLine: { backgroundColor: "#000000", height: 1, width: "35%" },
  upper: {
    backgroundColor: COLORS.blue,
    flex: 1,
    paddingHorizontal: MarginsAndPaddings.l,
    paddingVertical: -10,
  },
  lower: {
    paddingTop: 30,
    backgroundColor: COLORS.white,

    height: "50%",
    borderTopLeftRadius: 60,
    paddingHorizontal: MarginsAndPaddings.l,
    marginHorizontal: -8,
  },
  logo: {
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
    marginTop: -20,
    marginLeft: 60,
  },
});
export default styles;
