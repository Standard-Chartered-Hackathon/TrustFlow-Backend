const express = require("express");
const router = express.Router();
const imgageController = require("../controllers/imageController");

router.post("/processImage/:userId", imgageController.processImage);

module.exports = router;
