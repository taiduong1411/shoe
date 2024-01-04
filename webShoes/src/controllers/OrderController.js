const OrderServices = require("../services/OrderServices");
const createOrder = async (req, res) => {
  try {
    const {
      paymentMethod,
      itemsPrice,
      shippingPrice,
      totalPrice,
      fullName,
      address,
      city,
      phone,
    } = req.body;
    if (
      !paymentMethod ||
      !itemsPrice ||
      shippingPrice === undefined ||
      !totalPrice ||
      !fullName ||
      !address ||
      !city ||
      !phone
    ) {
      return res.status(422).json({
        status: "ERR",
        message: "The input is required",
      });
    }

    const response = await OrderServices.createOrder(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const getAllOrderDetails = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(422).json({
        status: "ERR",
        message: "The userId is required",
      });
    }

    const response = await OrderServices.getAllOrderDetails(userId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const getDetailsOrder = async (req, res) => {
  try {
    const orderId = req.params.id;
    if (!orderId) {
      return res.status(422).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }

    const response = await OrderServices.getOrderDetails(orderId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const cancelOrderDetails = async (req, res) => {
  try {
    const orderId = req.params.id;
    const data = req.body;
    if (!orderId) {
      return res.status(422).json({
        status: "ERR",
        message: "The orderId is required",
      });
    }

    const response = await OrderServices.cancelOrderDetails(orderId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};


const getAllOrder = async (req, res) => {
  try {
    const data = await OrderServices.getAllOrder()
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder
};
