const mongoose = require("mongoose")
const { schema } = require("./schema")

const AssignmentModel = mongoose.model("assignments", schema)
module.exports = AssignmentModel
