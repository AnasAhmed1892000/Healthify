import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  currentUser: false,
  username: "",
  password: "",
  token: "",
};

// const userSignIn = createAsyncThunk('user/userSignIn', async config => {
//   const response = await axios(config)
//     .then(function (response) {
//       console.log(JSON.stringify(response.data));
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// });
export const LoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setCurrentUser: (state, actions) => {
      state.currentUser = actions.payload;
    },
    setToken: (state, actions) => {
      state.token = actions.payload;
    },
    setUsername: (state, actions) => {
      state.username = actions.payload;
    },
    setPassword: (state, actions) => {
      state.password = actions.payload;
    },
  },
});
const Login = {
  LoginSlice,
  setCurrentUser: LoginSlice.actions.setCurrentUser,
  setUsername: LoginSlice.actions.setUsername,
  setPassword: LoginSlice.actions.setPassword,
  setToken: LoginSlice.actions.setToken,
};
export const selectCurrentUser = (state) => state.login.currentUser;
export const selectUsername = (state) => state.login.username;
export const selectPassword = (state) => state.login.password;
export const selectToken = (state) => state.login.token;
export default Login;
