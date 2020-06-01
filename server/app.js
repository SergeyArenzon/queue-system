const express = require("express");
// HTTP request logger
const morgan = require("morgan");

const bodyParser = require("body-parser");
// Connect to the client side that run on diffrent port
const cors = require("cors");
// import mongoose
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
    app.listen(process.env.PORT);
    require("./routes/index.route")(app, mongoose);
  });


  app.get("/", async (req, res, next) => {
    res.status(200).json({ message: "get only the address" });
  });

// fuser -n tcp -k 8080