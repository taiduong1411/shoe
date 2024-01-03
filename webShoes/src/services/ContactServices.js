const Contact = require("../models/Contact");

const getAllContact = async () => {
  return Contact.find();
};

const createOne = async (contact) => {
  const createdContact = await Contact.create(contact);

  return createdContact;
};

module.exports = {
  getAllContact,
  createOne,
};
