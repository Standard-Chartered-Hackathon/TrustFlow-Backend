require("dotenv").config();
// const userData = require("../data/usersData.json");
const userData = require("../../mongodb/models/User");
const axios = require("axios");

exports.processImage = async (req, res) => {
  const { imgUrl } = req.body;
  const { userId } = req.params;

  const user = await userData.findOne({ userId: userId });

  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  const { aadhaarCardNo, panCardNo } = user;

  try {
    const response = await axios.post(`${process.env.EC2FLASKURI}`, {
      imgUrl,
      panCardNo,
      aadhaarCardNo,
    }); // change current url to your ec2 flask url
    console.log(response);
    res.json(response.data);
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({ success: false, message: "Error processing image" });
  }
};
