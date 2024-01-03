import axios from "axios";

export const getAllContacts = async () => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/contact`);
  return res;
};
