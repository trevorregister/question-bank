const jwt = require("jsonwebtoken");
const { HttpError } = require("../core/errors");

module.exports = function (req, res, next) {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new HttpError(401, "not logged in");
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      throw new HttpError(403, "unauthorized");
    }

    req.user = { ...verified };
    next();
  } catch (err) {
    next(err);
  }
};
