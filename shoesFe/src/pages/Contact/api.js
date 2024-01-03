import * as message from "../../components/Message/Message";

import { ContactSlice } from "../../redux/slice/ContactSlice";
import axios from "axios";
import { getAllContacts } from "../../services/ContactServices";

export const sendContact = (data) => async (dispatch) => {
  try {
    const { status } = await axios.post(
      `${process.env.REACT_APP_API_URL}/contact`,
      data
    );

    if (status === 200) {
      message.success("Liên hệ thành công");
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchAllContacts = () => async (dispatch) => {
  try {
    const { updateContact } = ContactSlice.actions;

    const response = await getAllContacts();

    dispatch(updateContact(response.data));
  } catch (error) {}
};
