const express = require("express");
const fs = require('fs');

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');
var options = {
  key: key,
  cert: cert
};

// HTTP request logger
const morgan = require("morgan");

const bodyParser = require("body-parser");
// Connect to the client side that run on diffrent port
const cors = require("cors");
// import mongoose
const mongoose = require("mongoose");

const app = express();
const https = require('https')
const server = https.createServer(options, app);
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
    server.listen(process.env.PORT);
    require("./routes/index.route")(app, mongoose);
  });



app.post("/", async (req, res, next) => {
  const dbToNoRemove = ['local', 'admin', 'config', 'manager', 'dorlevi', 'guest'];
  try {


    const databases = await mongoose.connections[0].db
      .admin()
      .listDatabases({ listDatabases: 1, nameOnly: true });
    console.log(databases.databases);
    databases.databases.forEach(dbName => {
      console.log(dbName.name);
      if (dbToNoRemove.indexOf(dbName.name) < 0)

        mongoose
          .connect(process.env.MONGO_URI + dbName.name, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
          })
          .then(() => {
            return mongoose.connection.db.dropDatabase();

          });
    })
    res.status(205).json({ message: "delete", databases: databases.databases });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "admin error" });

  }
});



app.get("/", async (req, res, next) => {
  console.log("get only the address");

  res.status(200).json({ message: "get only the address" });
});

// fuser -n tcp -k 8080