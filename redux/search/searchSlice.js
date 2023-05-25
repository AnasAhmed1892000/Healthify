import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isSpecialityFound: false,
  speciality: "",
  response: {},
};
const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsSPecialityFound: (state, actions) => {
      state.isSpecialityFound = actions.payload;
    },
    setSpeciality: (state, actions) => {
      state.speciality = actions.payload;
    },
    setResponse: (state, actions) => {
      state.response = actions.payload;
    },
  },
});
const search = {
  SearchSlice,
  setIsSPecialityFound: SearchSlice.actions.setIsSPecialityFound,
  setSpeciality: SearchSlice.actions.setSpeciality,
  setResponse: SearchSlice.actions.setResponse,
};
export const selectIsSpecialityFound = (state) =>
  state.search.isSpecialityFound;
export const selectSpeciality = (state) => state.search.speciality;
export const selectResponse = (state) => state.search.response;
export default search;
