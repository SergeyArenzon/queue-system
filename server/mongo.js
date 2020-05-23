const mongoos = require("mongoose");

let con;
exports.mongo = async (req, res, next) => {
  try {
    con = await mongoos.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("DB Connected");
    setCon(con);
    // setCon(con);
    return con;
  } catch (error) {}
};
let a;
const setCon = (con1) => {
  console.log(con1.connections[0].name);
  console.log("daaaaaaaaa");

  a = con1;
};
exports.moongoose = () => {
  //   console.log(a);
  while (!a);
  console.log(a.connections[0].name);

  return a;
};
