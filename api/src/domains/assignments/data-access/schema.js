const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
  activity: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Activities",
  },

  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },

  startDate: {
    type: Date,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },

  class: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Classes",
  },
})
module.exports = {
  schema,
}
