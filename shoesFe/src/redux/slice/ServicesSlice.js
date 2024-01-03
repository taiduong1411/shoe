import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  services: [],
};

export const ServicesSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    updateServices: (state, action) => {
      state.services = action.payload;
    },
  },
});

export default ServicesSlice.reducer;
