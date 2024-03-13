// const userData = require("../data/usersData.json");
const userData = require("../../mongodb/models/User");

exports.userAuth = async (req, res) => {
  const { accountNumber, password, userId } = req.body;

  try {
    let user = await userData.findOne({
      $or: [{ accountNumber, password }, { userId }],
    });

    if (user) {
      res.json({
        success: true,
        userData: user,
      });
    } else {
      res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.updateKYCStatus = async (req, res) => {
  const userId = req.params.userId;
  const { isKYC } = req.body;

  try {
    const user = await userData.findOneAndUpdate(
      { userId: userId },
      { isKYC: isKYC },
      { new: true }
    );

    if (user) {
      res.json({
        success: true,
        message: "KYC status updated successfully",
      });
    } else {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

exports.checkUserData = async (req, res) => {
  const { username, dateOfBirth, aadhaarCardNo, panCardNo } = req.body;
  const { userId } = req.params;

  try {
    const user = await userData.findOne({ userId: userId });
    // console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (
      user.username === username &&
      user.dateOfBirth === dateOfBirth &&
      user.aadhaarCardNo === aadhaarCardNo &&
      user.panCardNo === panCardNo
    ) {
      res.json({ success: true });
    } else {
      res.json({ success: false, message: "User data does not match" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
