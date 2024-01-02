import { createDraftSafeSelector } from "@reduxjs/toolkit";

export const newestProductsSelector = createDraftSafeSelector(
  (state) => state,
  (state) => state.product.newestProducts
);

export const productStateSelector = createDraftSafeSelector(
  (state) => state,
  (state) => state.product
);
