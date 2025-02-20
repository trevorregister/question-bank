const mongoose = require("mongoose")

const Schema = mongoose.Schema

const studentRosterSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    joinDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const droppedStudentSchema = new Schema({
    student: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "Users"
    },
    dropDate: {
        type: Date,
        required: true,
        default: new Date()
    }
})

const schema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  name: {
    type: String,
    required: true
  },
  roster: {
    type: [studentRosterSchema],
    required: true,
    default: []
  },
  droppedStudents: {
    type: [droppedStudentSchema],
    required: true,
    default: []
  },
  isArchived: {
    type: Boolean,
    required: true,
    default: false
  }

})
module.exports = {
  schema,
}
