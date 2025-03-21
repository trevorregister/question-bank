const mongoose = require("mongoose")
const { schema } = require("./schema")

const ActivityResponseModel = mongoose.model("activityresponses", schema)
module.exports = ActivityResponseModel
