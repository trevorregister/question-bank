const mongoose = require("mongoose")
const { QUESTION_TYPES } = require("../../../core/enums")

const Schema = mongoose.Schema

const activityQuestionSchema = new Schema(
  {
    parent: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Questions",
    },

    prompt: {
      type: String,
      required: true,
    },

    variables: {
      type: Array,
      required: true,
      default: [],
    },

    conditions: {
      type: Array,
      required: true,
      default: [],
    },

    pointValue: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      required: true,
      enum: {
        values: Object.values(QUESTION_TYPES),
      },
    },
  },
  { _id: false },
)

const activitySectionSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    questions: { type: [activityQuestionSchema], required: true, default: [] },
    summary: { type: String, required: true },
    sectionIndex: { type: Number, required: true },
  },
  { _id: false },
)

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
    type: [activitySectionSchema],
    required: true,
    default: [],
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
