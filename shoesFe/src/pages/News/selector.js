import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const newsSelector = createDraftSafeSelector(
  (state) => state,
  (state) => state.news.news
);
