const express = require("express");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const Routes = require("./routes");
const errorHandler = require("./src/middleware/errorHandler");

const app = express();
const corsOptions = {
  //origin: process.env.WEB_HOST,
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use("/api", Routes());
app.use(errorHandler);

module.exports = app;
