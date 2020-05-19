const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// HTTP request logger
const morgan = require("morgan");
// load env variables
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require("express-validator");

// Connect to the client side that run on diffrent port
const cors = require("cors");
// import routes
const businessRoutes = require("./routes/business/service.business-route");

// init express
const app = express();

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("DB Connected"));

mongoose.connection.on("error", (err) => {
  console.log(`DB connection error: ${err.message}`);
});

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

// used to save users credentials
app.use(cookieParser());

// Routes
app.use("/business", businessRoutes);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg = error.message || "error with statusCode" + status;
  const data = error.data;
  res.status(status).json({ message: msg, data: data });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port - " + process.env.PORT);
});
