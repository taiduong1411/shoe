const express = require("express");

const router = express.Router();

const NewsController = require("../controllers/NewsController");

router.get("/", NewsController.getAllNews);
router.post("/", NewsController.createOne);

module.exports = router;
