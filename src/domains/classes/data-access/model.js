const mongoose = require("mongoose")
const { schema } = require("./schema")

const ClassModel = mongoose.model("classes", schema)
module.exports = ClassModel
