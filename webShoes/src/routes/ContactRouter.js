const express = require("express");

const router = express.Router();

const ContactController = require("../controllers/ContactController");

router.get("/", ContactController.getAllContact);
router.post("/", ContactController.createOne);

module.exports = router;
