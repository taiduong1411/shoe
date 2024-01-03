import { ServicesSlice } from "../../redux/slice/ServicesSlice";
import { getAllServices } from "../../services/ServicesServices";

export const fetchAllServices = () => async (dispatch) => {
  try {
    const { updateServices } = ServicesSlice.actions;

    const response = await getAllServices();

    dispatch(updateServices(response.data));
  } catch (error) {
    console.log(error);
  }
};
