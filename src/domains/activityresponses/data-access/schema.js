const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Activities",
  },

  teacher: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  student: {
    type: String,
    required: true,
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
