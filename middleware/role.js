function role(req, res, next) {
  try {
    next();
  } catch (err) {
    console.error(err);
    res.status(403).json({
      errorMessage: "Forbidden",
    });
  }
}

module.exports = role;
