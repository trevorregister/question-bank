const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server")

module.exports = async function connect(environment) {
  let uri
  let mongo
  switch (environment) {
    case "local":
      uri = process.env.MONGO_LOCAL_URI
      break
    case "production":
      uri = process.env.MONGO_PRODUCTION_URI
      break
    case "test":
      mongo = await MongoMemoryServer.create()
      uri = mongo.getUri()
      break
  }

  const connection = await mongoose.connect(uri)
  console.log(`Connected to ${connection.connections[0].name}`)
  return connection.connections[0]
}
