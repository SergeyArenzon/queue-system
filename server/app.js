const express = require("express");
// import mongoose
// HTTP request logger
const morgan = require("morgan");
const bodyParser = require("body-parser");

// Connect to the client side that run on diffrent port
const cors = require("cors");
// import routes
const mongoose = require("mongoose");

const { errorDomain401 } = require("./helper/dbErrorHandler");
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

app.get(
  "/mail",
  require("./controller/business/auth.employee-controller").mail
);

app.post(
  "/login",
  require("./controller/business/auth.employee-controller").employeeLogin
);

app.post(
  "/sendMessage",

  require("./controller/business/auth.employee-controller")
    .employeeSmsResetPassword
);

app.post(
  "/resetPassword/:token",
  require("./validator/employee.validator").passwordIsEqualValidator,
  require("./middleware/is-auth")("resetPassword", mongoose),
  require("./controller/business/auth.employee-controller")
    .employeeResetPassword
);

app.get("/check/:businessUrl", async (req, res, next) => {
  const businessUrl = req.params.businessUrl;
  try {
    let ans = await require("./models/domain.model").find();
    ans = ans.every((e) => e.domain !== businessUrl);
    errorDomain401(ans);
    res.status(200).json({ message: "Domain is free" });
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
  console.log(error);

  const status = error.statusCode || 500;
  const message = !error.statusCode
    ? error.name + " גישה נדחתה, נא להתחבר מחדש, אם זה חוזר אנא פנה לתמיכה"
    : error.message;
  const data = error.data;
  res.status(status).json({ message, data });
});

app.use(function (req, res, next) {
  res.status(404).json({ message: "כתובת לא נמצאה" });
});
