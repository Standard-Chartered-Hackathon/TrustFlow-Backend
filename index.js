require("dotenv").config();

const express = require("express");
const app = express();
const userAuthRouter = require("./src/routes/userAuth");
const usersRouter = require("./src/routes/users");
const imageRouter = require("./src/routes/image");
const healthCheck = require("./src/routes/healthCheck");
const connectDB = require("./mongodb/connect");
const cors = require("cors");

app.use(cors());
app.use(express.json());

app.use("/v1/userAuth", userAuthRouter);
app.use("/v1/users", usersRouter);
app.use("/v1/image", imageRouter);
app.use("/v1/healthcheck", healthCheck);

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    connectDB(process.env.MONGODB_URL);
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
