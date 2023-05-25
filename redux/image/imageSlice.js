import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  imageUri: "",
};
export const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setImageUri: (state, actions) => {
      state.imageUri = actions.payload;
    },
  },
});
const image = {
  imageSlice,
  setImageUri: imageSlice.actions.setImageUri,
};
export const selectImageUri = (state) => state.image.imageUri;
export default image;
