import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  news: [],
};

export const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateNews: (state, action) => {
      state.news = action.payload;
    },
  },
});

export default NewsSlice.reducer;
