require('dotenv').config()
require('./config/envirement')
require('./middleware/graylog')

const express = require('express')
const app = express()
const mongoose = require('mongoose')

const cookieParser = require('cookie-parser')
const cors = require('cors')

let morganLogger = require('morgan');
const stream = require("./middleware/stream");

const appRootPath = require('app-root-path');
const path = require('path');
const http = require('http');

const server = http.Server(app);
const {
  Server
} = require("socket.io");


//setup server



server.listen(ENV.APP_PORT, () => {
  console.log(`Server running on port: ${ENV.APP_PORT}`)
})
global.io = require("socket.io")(server);
io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});


app.use(
  cors({
    origin: ENV.APP_PROTOCOL + '://' + ENV.APP_HOST + ':' + ENV.APP_PORT,
    credentials: true,
  })
)


const fs = require('fs')

//for incoming request...
app.use(express.json())
app.use(cookieParser())

//Connect to mongoDB:
mongoose.Promise = global.Promise

mongoose.connect(
  ENV.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  },
  (err) => {
    if (err) {
      return console.error(err)
    } else {
      console.log('Connected to MongoDB ')
    }
  }
)

global.Models = require("./models/")




app.get('/doc', function(req, res) {
  res.sendFile(path.join(appRootPath + '/docs/doc.html'));
});





app.use(morganLogger(
  `:status :method :url :remote-addr responseTime=[*:response-time*]\n:user-agent`, {
    stream: stream
  }));
// //set up routers
app.use('/unified/exampleMicroservice/auth/', require('./routers/userRouter'));
// // Apply the authentication middleware for all next called routes
app.use(require("./middleware/auth"));
app.use(require("./middleware/role"));
app.use(require("./middleware/requestHistory"));

const files = fs.readdirSync('./routers');
let pathRouter = "";
for (const file of files) {
  pathRouter = '/unified/exampleMicroservice/' + file.substr(0, file.indexOf("Router"));
  app.use(pathRouter, require('./routers/' + file));

}


require('./cron')
