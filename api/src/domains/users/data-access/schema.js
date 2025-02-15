const mongoose = require("mongoose");
const { USER_ROLES } = require("../../../core/enums");

const Schema = mongoose.Schema;

const schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },

  firstName: {
    type: String,
    required: true,
  },

  hash: {
    type: String,
    required: true,
  },

  lastName: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    required: true,
    enum: {
      values: Object.values(USER_ROLES),
    },
  },
});
module.exports = {
  schema,
};
