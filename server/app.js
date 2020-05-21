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


app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg =(error.data && error.data.msg )||error.message || "error with statusCode" + status;
  const data = error.data;
  res.status(status).json({ message: msg, data: data });
});

app.listen(process.env.PORT);


app.use("/:businessUrl", (req, res, next) => {
  console.log(req.params.businessUrl);
   mongoose
  .connect(process.env.MONGO_URI + req.params.businessUrl,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
    .then((result) => {
      console.log("DB Connected");
      next();
    })
    .catch((err) => {
      return next(err);
    });
});

require("./routes/index.route")(app);

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg = (error.data && error.data.msg )||error.message || "error with statusCode" + status;
  const data = error.data;
  console.log(error);
  
  res.status(status).json({ message: msg, data });
});
