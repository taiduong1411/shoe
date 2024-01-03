import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const servicesSelector = createDraftSafeSelector(
  (state) => state,
  (state) => state.services.services
);
