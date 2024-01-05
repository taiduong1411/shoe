const OrderServices = require("../services/OrderServices");
const Order = require("../models/OrderProduct");

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
    const data = await OrderServices.getAllOrder();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const report = async (req, res) => {
  try {
    const result = await Order.aggregate([
      {
        $group: {
          _id: {
            date: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$createdAt",
              },
            },
          },
          totalRevenue: { $sum: "$totalPrice" },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 1,
          date: "$_id.date",
          totalRevenue: 1,
          totalOrders: 1,
        },
      },
      {
        $sort: {
          date: 1,
        },
      },
    ]);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getAllOrderDetails,
  getDetailsOrder,
  cancelOrderDetails,
  getAllOrder,
  report,
};
