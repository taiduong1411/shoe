const ServicesServices = require("../services/ServicesServices");

const getAllServices = async (req, res) => {
  try {
    const response = await ServicesServices.getAllServices();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const createOne = async (req, res) => {
  try {
    const response = await ServicesServices.createOne(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  getAllServices,
  createOne,
};
