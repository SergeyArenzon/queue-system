const {
  error422,
  error404,
  error403Admin,
} = require("../../helper/dbErrorHandler");

exports.postService = async (req, res, next) => {
  try {
    error422(req);
    const Service = require("../../models/service.model")(req.mongo);

    error403Admin(req);

    const { title, price, duration } = req.body;

    const service = new Service({
      title: title,
      price: price,
      duration: duration,
    });

    await service.save();

    res.status(201).json({
      msg: "create new service",
      service: service,
    });
  } catch (err) {
    return next(err);
  }
};

exports.getServices = async (req, res, next) => {
  try {
    const services = await Service(req.mongo).find();    
    error404(services)
    res.status(201).json({
      msg: "all the services",
      services
    });
  } catch (error) {
    return next(error);
  }
};

exports.putService = async (req, res, next) => {
  try {
    error422(req);
    const Service = require("../../models/service.model")(req.mongo);

    const service = await Service.findById(req.params.serviceId);
    error404(service);

    error403Admin(req);

    const { title, price, duration } = req.body;
    service.title = title;
    service.price = price;
    service.duration = duration;
    await service.save();
    res.status(200).json({
      message: "service update",
      service: service,
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteService = async (req, res, next) => {
  try {
    const serviceId = req.params.serviceId;

    const Service = require("../../models/service.model")(req.mongo);

    const service = await Service.findById(serviceId);

    await error404(service);

    await error403Admin(req);

    await Service.findByIdAndDelete(serviceId);
    res.status(200).json({ message: "service deleted" });
  } catch (err) {
    return next(err);
  }
};
