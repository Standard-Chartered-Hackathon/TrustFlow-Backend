const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const healthCheckData = {
    success: true,
    message: "API v1 working!",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  };

  res.status(200).json(healthCheckData);
});

module.exports = router;
