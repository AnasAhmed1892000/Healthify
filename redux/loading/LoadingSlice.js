import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  loading: false,
};
export const LoadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
  },
});
const Loading = {
  LoadingSlice,
  setLoading: LoadingSlice.actions.setLoading,
};
export const selectIsLoading = (state) => state.loading.loading;
export default Loading;
