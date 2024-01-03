const mongoose = require("mongoose");
const servicesSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    address: { type: String, required: true },
    contact: { type: String, required: true },
    completionTime: { type: Number, required: true },
    price: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);
const Services = mongoose.model("Services", servicesSchema);
module.exports = Services;
