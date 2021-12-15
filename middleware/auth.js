const jwt = require("jsonwebtoken");
const secret = ENV.JWT_SECRET;

async function auth(req, res, next) {
  //return next()
  try {

    const token =(req.headers.authorization)? req.headers.authorization.split(' ')[1] : req.cookies.token.split(' ')[1];

    if (!token) throw (token);
    req.paginator={}
    req.paginator.limit = req.headers.size || 50;
    req.paginator.page = req.headers.page * req.paginator.limit || 0;

    const verified = jwt.verify(token, secret);
    // check if the token is expired
    // if (new Date()>new Date(verified.exp))
    //   return res.status(401).json({
    //     errorMessage: "Unauthorized",
    //     reason: "token expired after 24 hours"
    //   });



  const user=await  Models.User.findOne({
    email:verified.sub
    }).select('-passwordHash -networks -tasks -userNotifications')
      // Do something with the user
      if (user) {
        req.user = user;

        next();
      } else {
        throw "wrong token format or or user mismatch between both databases"
      }




  } catch (err) {

    console.error(err);
    res.status(401).json({
      errorMessage: err
    });
  }
}


function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}
module.exports = auth;
