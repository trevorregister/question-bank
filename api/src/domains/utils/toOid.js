const mongoose = require('mongoose')

module.exports = function toOid(id) {
    return mongoose.Types.ObjectId.createFromHexString(id)
}