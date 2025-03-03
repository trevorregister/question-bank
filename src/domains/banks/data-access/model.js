const mongoose = require("mongoose")
const { schema } = require("./schema")

const BankModel = mongoose.model("banks", schema)
module.exports = BankModel
