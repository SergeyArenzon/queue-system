const express = require("express");
// import mongoose
const mongoose = require("mongoose");
// HTTP request logger
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Connect to the client side that run on diffrent port
const cors = require("cors");
// import routes

// init express
const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());
require("./routes/index.route")(app);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg = error.message || "error with statusCode" + status;
  const data = error.data;
  res.status(status).json({ message: msg, data: data });
});

// DB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("DB Connected");

    app.listen(process.env.PORT);
    console.log("Server is running on port - " + process.env.PORT);
  })
  .catch((err) => {
    console.log(err);
  });
