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
app.get("/check/:businessUrl", async (req, res, next) => {
  const businessUrl = req.params.businessUrl;
  console.log(businessUrl);

  try {
    let ans = await mongoose.connections[0].db
      .admin()
      .listDatabases({ listDatabases: 1, nameOnly: true });
    ans = ans.databases.every((e) => e.name !== businessUrl);
    if (!ans) throw new Error("שם קיים במערכת");
    res.status(200);
  } catch (error) {
    next(error);
  }
});

app.use("/:businessUrl", async (req, res, next) => {
  try {
    const businessUrl = req.params.businessUrl;

    req.mongo = mongoose.connection.useDb(businessUrl);
    next();
  } catch (error) {
    next(error);
  }
});

require("./routes/index.route")(app);

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

app.use(function (req, res, next) {
  res.status(404).json({ message: "Sorry can't find that!" });
});
