const express = require("express");
// import mongoose
// HTTP request logger
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Connect to the client side that run on diffrent port
const cors = require("cors");
// import routes
const mongoose = require("mongoose");

const app = express();

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors());

app.listen(process.env.PORT);

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB Connected");
  });

app.get("/check", async (req, res, next) => {
  try {
    const dataBaseList = await mongoose.connections[0].db
      .admin()
      .listDatabases({ listDatabases: 1, nameOnly: true });
    
    res.status(200).json(dataBaseList.databases);
  } catch (error) {    
    next(error);
  }
});

app.use("/:businessUrl", (req, res, next) => {
  const businessUrl = req.params.businessUrl;

  req.mongo = mongoose.connection.useDb(businessUrl);

  require("./routes/index.route")(app);

  next();
});

app.use((error, req, res, next) => {
  const status = error.statusCode || 500;
  const msg =
    (error.data && error.data.msg) ||
    error.message ||
    "error with statusCode" + status;
  const data = error.data;
  // console.log(error);

  res.status(status).json({ message: msg, data });
});
