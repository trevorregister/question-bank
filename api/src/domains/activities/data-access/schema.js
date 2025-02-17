const mongoose = require("mongoose")

const Schema = mongoose.Schema

const schema = new Schema({
  name: {
    type: String,
    required: true,
  },
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  sections: {
    type: [
      {
        id: { type: Schema.Types.ObjectId, required: true },
        name: { type: String },
        questions: [
          {
            type: Schema.Types.ObjectId,
            required: true,
            ref: "Questions",
          },
        ],
        summary: { type: String },
        sectionIndex: { type: Number },
      },
    ],
    required: true,
  },
  isArchived: { type: Boolean, required: true, default: false },
  tags: {
    type: [String],
    required: true,
    default: [],
  },
  questionCount: { type: Number, required: true, default: 0 },
})
module.exports = {
  schema,
}
