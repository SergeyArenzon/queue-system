const Business = require("../../models/business.model");
const moment = require("moment");
const {
  error422,
  error404,
  error403Admin,
} = require("../../helper/dbErrorHandler");
exports.postBuisnessDetails = async (req, res, next) => {
  const {
    businessName,
    businessAddress,
    businessPhone,
    businessEmail,
    logo,
    socialMediaLinks,
    about,
    notifications,
  } = req.body;

  try {
    error422(req);

    error403Admin(req);

    const updatdeDetail = {
      businessName,
      businessAddress,
      businessPhone,
      businessEmail,
      logo,
      socialMediaLinks,
      about,
      notifications,
    };
    const detailsExist = await Business.findOneAndUpdate(updatdeDetail);
    if (!detailsExist) await new Business(updatdeDetail).save();

    res.status(201).json({
      msg: "update buisness details",
      updatdeDetail: updatdeDetail,
    });
  } catch (err) {
    return next(err);
  }
};

exports.postBuisnessHours = async (req, res, next) => {
  try {
    error422(req);

    error403Admin(req);

    const buisness = await Business.findOne();
    buisness.schedule = [...req.body.schedule];

    await buisness.save();

    res.status(200).json({
      msg: "update buisness hours",
      buisness,
    });
  } catch (err) {
    return next(err);
  }
};

exports.postDefualtHours = async (req, res, next) => {
  var d = new Date();
  d.setHours(d.getHours() + 5);
  var a = new Date();
  a = moment(a).format("HH:mm");
  d = moment(d).format("HH:mm");
  const arr = [
    { day: "friday", startTime: a, endTime: d },
    { day: "mon", startTime: a, endTime: d },
    { day: "tue", startTime: a, endTime: d },
  ];
  console.log(a);

  try {
    const buisness = await Business.findOne();

    buisness.schedule = arr;

    await buisness.save();

    res.status(200).json({
      msg: "update buisness hours",
      buisness,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getBuisnessDetails = async (req, res, next) => {
  try {
    const buisnessDetails = await Business.findOne();
    error404(buisnessDetails);
    res.status(200).json({
      msg: "buisness details",
      buisnessDetails,
    });
  } catch (err) {
    return next(err);
  }
};
