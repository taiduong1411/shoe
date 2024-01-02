import axios from "axios";

export const getAllNews = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/news`);
  return res;
};
