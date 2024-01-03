const express = require("express");

const router = express.Router();

const ServicesController = require("../controllers/ServicesController");

router.get("/", ServicesController.getAllServices);
router.post("/", ServicesController.createOne);

module.exports = router;
