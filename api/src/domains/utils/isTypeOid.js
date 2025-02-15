const mongoose = require("mongoose");

module.exports = function isTypeOid(id) {
  return id instanceof mongoose.Types.ObjectId;
};
