const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// HTTP request logger
const morgan = require("morgan");
// load env variables
require("dotenv").config();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// Connect to the client side that run on diffrent port
const cors = require("cors");
// import routes

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
require("./routes/index.route")(app);
// used to save users credentials
app.use(cookieParser());

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg = error.message || "error with statusCode" + status;
  const data = error.data;
  res.status(status).json({ message: msg, data: data });
});

app.listen(process.env.PORT, () => {
  console.log("Server is running on port - " + process.env.PORT);
});
