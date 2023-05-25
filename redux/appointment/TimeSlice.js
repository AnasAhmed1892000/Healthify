import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  time: "",
  id: null,
  isSelected: false,
};
export const TimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setTime: (state, actions) => void (state.time = actions.payload),
    setID: (state, actions) => void (state.id = actions.payload),
    setIsSelected: (state, actions) =>
      void (state.isSelected = actions.payload),
  },
});
const time = {
  TimeSlice,
  setTime: TimeSlice.actions.setTime,
  setID: TimeSlice.actions.setID,
  setIsSelected: TimeSlice.actions.setIsSelected,
};
export const selectTime = (state) => state.time.time;
export const selectID = (state) => state.time.id;
export const selectIsSelected = (state) => state.time.isSelected;
export default time;
