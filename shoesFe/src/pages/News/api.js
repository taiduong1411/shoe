import { NewsSlice } from "../../redux/slice/NewsSlice";
import { getAllNews } from "../../services/NewsServices";

export const fetchAllNews = () => async (dispatch) => {
  try {
    const { updateNews } = NewsSlice.actions;

    const response = await getAllNews();

    dispatch(updateNews(response.data));
  } catch (error) {
    console.log(error);
  }
};
