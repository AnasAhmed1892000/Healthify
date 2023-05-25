import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  weight: 0,
  height: 0,
};
export const BMISlice = createSlice({
  name: "bmi",
  initialState,
  reducers: {
    setWeight: (state, actions) => {
      state.weight = actions.payload;
    },
    setHeight: (state, actions) => {
      state.height = actions.payload;
    },
  },
});
const BMI = {
  BMISlice,
  setWeight: BMISlice.actions.setWeight,
  setHeight: BMISlice.actions.setHeight,
};
export const selectWeight = (state) => state.bmi.weight;
export const selectheight = (state) => state.bmi.height;
export default BMI;
