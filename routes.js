const express = require("express")
const userRoutes = require("./src/domains/users/routes.js")
const questionRoutes = require("./src/domains/questions/routes.js")
const bankRoutes = require("./src/domains/banks/routes.js")
const activityRoutes = require("./src/domains/activities/routes.js")
const classRoutes = require("./src/domains/classes/routes.js")
const assignmentRoutes = require("./src/domains/assignments/routes.js")
const assignmentResponseRoutes = require("./src/domains/responses/routes.js")
const authenticate = require("./src/middleware/authenticate.js")

function Routes() {
  const router = express.Router()

  router.get("/", (req, res, next) => {
    res.status(201).send("hello")
  })
  router.use("/users", userRoutes())

  router.use(authenticate)

  router.use("/questions", questionRoutes())
  router.use("/banks", bankRoutes())
  router.use("/activities", activityRoutes())
  router.use("/classes", classRoutes())
  router.use("/assignments", assignmentRoutes())
  router.use("/responses", assignmentResponseRoutes())
  return router
}

module.exports = Routes
