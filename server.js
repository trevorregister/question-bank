const app = require("./app.js")
const connect = require("./config/db.js")

switch (process.env.NODE_ENV) {
  case "local":
    connect("local")
    break
  case "test":
    connect("test")
    break
  case "production":
    connect("production")
    break
  default:
    throw new Error(`${process.env.NODE_ENV} is invalid environment`)
}
app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}...`),
)
