import axios from "axios";

export const getAllServices = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/services`);
  return res;
};
