import {
  getAllProduct,
  getNewestProducts,
} from "../../services/ProductServices";

import { ProductSlice } from "../../redux/slice/ProductSlice";

export const fetchAllProducts =
  (search, limit, searchBy, currentPage) => async (dispatch) => {
    try {
      const {
        updateProducts,
        updateCurrentPage,
        updateTotalProducts,
        updateTotalPage,
      } = ProductSlice.actions;

      const response = await getAllProduct(
        search,
        limit,
        searchBy,
        currentPage - 1
      );

      dispatch(updateProducts(response.data));
      dispatch(updateCurrentPage(response.pageCurrent));
      dispatch(updateTotalProducts(response.total));
      dispatch(updateTotalPage(response.totalPage));
    } catch (error) {

    }
  };

export const fetchNewestProducts = () => async (dispatch) => {
  try {
    const { updateNewestProducts } = ProductSlice.actions;

    const response = await getNewestProducts();

    dispatch(updateNewestProducts(response.data));
  } catch (error) {
  }
};
