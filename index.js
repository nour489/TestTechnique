require("dotenv").config();
require("./config/envirement");
const path = require("path");

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors"); // Enable CORS for API requests

const http = require("http");

const server = http.Server(app);

//setup server
server.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port: ${ENV.APP_PORT}`);
});

const fs = require("fs");
const { CLOSING } = require("ws");

//for incoming request...
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(cors()); // Enable CORS for cross-origin requests

//Connect to mongoDB:
mongoose.Promise = global.Promise;

mongoose.connect(
  ENV.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      return console.error(err);
    } else {
      console.log("Connected to MongoDB ");
    }
  }
);

global.Models = require("./models/");

// //set up routers

const files = fs.readdirSync("./routers");
let pathRouter = "";
for (const file of files) {
  pathRouter = "/" + file.substr(0, file.indexOf("Router"));
  app.use(pathRouter, require("./routers/" + file));
}
