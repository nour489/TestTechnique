function requestHistory(req, res, next) {
    next();

    Models.Action.create({
      email: req.user.email,
      customer: req.user.Customer,
      hostname: req.hostname,
      ip: req.ip,
      originalUrl: req.originalUrl,
      params: req.params,
      path: req.path,
      protocol: req.protocol,
      query: req.query,
      method: req.method,
      secure: req.secure,
      xhr: req.xhr,
      body: req.body
    })

}

module.exports = requestHistory;
