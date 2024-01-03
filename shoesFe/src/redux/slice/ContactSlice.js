import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contact: [],
};

export const ContactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {
    updateContact: (state, action) => {
      state.contact = action.payload;
    },
  },
});

export default ContactSlice.reducer;
