const mongoose = require("mongoose")
const { schema } = require("./schema")

const ActivitiesModel = mongoose.model("activities", schema)
module.exports = ActivitiesModel
