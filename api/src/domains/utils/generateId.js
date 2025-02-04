const mongoose = require('mongoose')

module.exports = function generateId() {
    return new mongoose.Types.ObjectId()
}