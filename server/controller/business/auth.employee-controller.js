const {
  errorPassword401: error401,
  error404,
  error422,
} = require("../../helper/dbErrorHandler");
const Domain = require("../../models/domain.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // to generate signed token

exports.register = async (req, res, next) => {
  const { firstName, lastName, phone, email, password, isAdmin } = req.body;

  try {
    error422(req);
    const Employee = require("../../models/employee.model")(req.mongo);

    const domain = new Domain({
      phone,
      domain: req.mongo.name,
    });

    await domain.save();

    const hashedPw = await bcrypt.hash(password, 12);

    const employee = new Employee({
      firstName,
      lastName,
      phone,
      email,
      isAdmin,
      password: hashedPw,
    });
    await employee.save();
    const token = createToken(employee);
    res.status(201).json({ message: "create new business", token: token });
  } catch (error) {
    console.log(error);

    return next(error);
  }
};
const mongoose = require("mongoose");
exports.employeeLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const domain = await Domain.findOne({ phone: phone });
    console.log(domain);

    error404(domain);

    req.mongo = mongoose.connection.useDb(domain.domain);
    const Employee = require("../../models/employee.model")(req.mongo);

    const employee = await Employee.findOne({ phone: phone });
    error404(employee);

    const isEqual = await bcrypt.compare(password, employee.password);
    error401(isEqual);
    const token = createToken(employee);
    res.status(200).json({
      message: "employee login success",
      token,
      domain: domain.domain,
    });
  } catch (error) {
    return next(error);
  }
};

const accountSid = "AC71b5c46e2de8d97a3dfb0cd08776cf4a";
const authToken = "f25ed123c124724259a4cda167f7c230";
const client = require("twilio")(accountSid, authToken);

exports.employeeSmsResetPassword = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const domain = await Domain.findOne({ phone: phone });
    error404(domain);

    const token = jwt.sign(
      {
        domain,
        phone,
      },
      process.env.JWT_SECRET
    );

    client.messages
      .create({
        body: `אנא לחץ על הלינק https://kavanuu.firebaseapp.com/resetPassword/${token}      ${phone}`,
        from: "+12069845943",
        to: "+972543055086",
      })
      .then((message) => console.log(message.sid))
      .done();

    res.status(200).json({
      message: "sms for reset sent to" + phone,
      token,
    });
  } catch (error) {
    return next(error);
  }
};

exports.employeeResetPassword = async (req, res, next) => {
  try {
    error422(req);
    const { password } = req.body;

    const hashedPw = await bcrypt.hash(password, 12);
    req.employee.password = hashedPw;

    await req.employee.save();

    const token = createToken(req.employee);
    res.status(205).json({
      message: "employee change password success",
      token,
      domain: req.domain,
    });
  } catch (error) {
    return next(error);
  }
};

const createToken = (employee) => {
  return jwt.sign(
    {
      employeeId: employee._id.toString(),
    },
    process.env.JWT_SECRET
  );
};
