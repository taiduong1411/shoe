const Services = require("../models/Services");

const getAllServices = async () => {
  return Services.find();
};

const createOne = async (service) => {
  const createdServices = await Services.create(service);

  return createdServices;
};

module.exports = {
  getAllServices,
  createOne,
};
