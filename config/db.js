const mongoose = require("mongoose");

module.exports = async function connect(environment) {
  let uri
  switch (environment) {
    case "local":
      uri = process.env.MONGO_LOCAL_URI;
      break;
    case "production":
      uri = process.env.MONGO_PRODUCTION_URI;
      break;
  }

  var connection = await mongoose.connect(uri);
  console.log(`Connected to ${connection.connections[0].name}`);
};
