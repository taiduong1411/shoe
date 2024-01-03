const ContactServices = require("../services/ContactServices");

const getAllContact = async (req, res) => {
  try {
    const response = await ContactServices.getAllContact();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const createOne = async (req, res) => {
  try {
    const response = await ContactServices.createOne(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  getAllContact,
  createOne,
};
