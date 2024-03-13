const express = require("express");
const router = express.Router();
// const userData = require("../data/usersData.json");
const userData = require("../../mongodb/models/User");

router.get("/", async (req, res) => {
  try {
    const users = await userData.find();

    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
