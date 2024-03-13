const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.userAuth);
router.post("/checkUserData/:userId", userController.checkUserData);
router.patch("/updateKYC/:userId", userController.updateKYCStatus);

module.exports = router;
