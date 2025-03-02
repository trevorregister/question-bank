const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
  assignment: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Assignments",
  },

  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  variables: {
    type: Array,
    required: true,
    default: [],
  },

  responses: {
    type: Array,
    required: true,
    default: [],
  },

  totalScore: {
    type: Number,
    required: true,
    default: 0,
  },
})
module.exports = {
  schema,
}
