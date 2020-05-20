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

app.listen(process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI + "gilad", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    con = result;
    console.log("DB Connected");
  })
  .catch((err) => {});
app.use("/:businessUrl", async (req, res, next) => {
  console.log(req.params.businessUrl);
  try {
    await mongoose.connection.useDb(req.params.businessUrl);
  } catch (error) {
    return next(error);
  }
  console.log("sss", mongoose.connection.name);

  next();
});

require("./routes/index.route")(app);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg = error.message || "error with statusCode" + status;
  const data = error.data;

  res.status(status).json({ message: msg, data });
});
