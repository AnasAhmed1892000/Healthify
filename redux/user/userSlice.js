import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  username: null,
  role: null,
  image: null,
  email: "",
  phoneNumber: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsername: (state, actions) => {
      state.username = actions.payload;
    },
    setRole: (state, actions) => {
      state.role = actions.payload;
    },
    setImage: (state, actions) => {
      state.image = actions.payload;
    },
    setEmail: (state, actions) => {
      state.email = actions.payload;
    },
    setPhoneNumber: (state, actions) => {
      state.phoneNumber = actions.payload;
    },
  },
});
const user = {
  userSlice,
  setUsername: userSlice.actions.setUsername,
  setRole: userSlice.actions.setRole,
  setImage: userSlice.actions.setImage,
  setEmail: userSlice.actions.setEmail,
  setPhoneNumber: userSlice.actions.setPhoneNumber,
};
export const selectUsername = (state) => state.user.username;
export const selectRole = (state) => state.user.role;
export const selectImage = (state) => state.user.image;
export const selectEmail = (state) => state.user.email;
export const selectPhoneNumber = (state) => state.user.phoneNumber;
export default user;
