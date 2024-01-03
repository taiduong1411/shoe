const ProductServices = require("../services/ProductServices");

const createProduct = async (req, res) => {
  try {
    const { name, image, type, price, countInStock, rating, description } =
      req.body;

    if (!name || !image || !type || !price || !countInStock || !description) {
      return res.status(422).json({
        status: "ERR",
        message: "The input is required",
      });
    }
    const response = await ProductServices.createProduct(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.updateProduct(productId, data);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getDetailProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.getDetailProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    if (!productId) {
      return res.status(422).json({
        status: "ERR",
        message: "The productId is required",
      });
    }

    const response = await ProductServices.deleteProduct(productId);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const deleteMany = async (req, res) => {
  try {
    const ids = req.body.ids;
    if (!ids) {
      return res.status(422).json({
        status: "ERR",
        message: "The ids is required",
      });
    }

    const response = await ProductServices.deleteManyProduct(ids);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getAllProduct = async (req, res) => {
  try {
    const { limit, page, sort, filter } = req.query;

    const response = await ProductServices.getAllProduct(
      Number(limit) || null,
      Number(page) || 0,
      sort,
      filter
    );
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};
const getAllType = async (req, res) => {
  try {
    const response = await ProductServices.getAllType();
    return res.status(200).json(response);
  } catch (e) {
    return res.status(400).json({
      message: e,
    });
  }
};

const getNewestProduct = async (req, res) => {
  try {
    const response = await ProductServices.getNewestProduct();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getDetailProduct,
  deleteProduct,
  deleteMany,
  getAllProduct,
  getAllType,
  getNewestProduct,
};
