const mongoose = require("mongoose")
const { schema } = require("./schema")

const AssignmentResponseModel = mongoose.model("assignmentresponses", schema)
module.exports = AssignmentResponseModel
