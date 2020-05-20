const Business = require("../../models/business.model");
const Employee = require("../../models/employee.model");

const { error401, error404, error422 } = require("../../helper/dbErrorHandler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // to generate signed token

exports.register = async (req, res, next) => {
  const { firstName, lastName, phone, email, password, isAdmin } = req.body;

  try {
    error422(req);

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
    // const business = new Business({
    //   businessDetails: {
    //     businessName,
    //     businessAddress,
    //     businessPhone,
    //     businessEmail,
    //     logo,
    //     socialMediaLinks,
    //     about,
    //     notifications,
    //   },
    // });
    // await business.save();
    const token = createToken(employee);
    res.status(201).json({ message: "create new business", token: token });
  } catch (error) {
    console.log(error);

    return next(error);
  }
};

exports.employeeLogin = async (req, res, next) => {
  try {
    const { phone, password } = req.body;
    const employee = await Employee.findOne({ phone: phone });
    console.log(employee);

    error404(employee);

    const isEqual = await bcrypt.compare(password, employee.password);
    error401(isEqual);
    const token = createToken(employee);
    res.status(200).json({ message: "employee login success", token: token });
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
