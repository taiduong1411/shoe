import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const contactSelector = createDraftSafeSelector(
  (state) => state,
  (state) => state.contact.contact
);
