const express = require("express")
const ClassModel = require('./data-access/model')
const ClassRepository = require("./repository")
const ClassController = require("./controller")
const { Class } = require("../auth/subjects")
const authorize = require("../../middleware/authorize")
const authenticate = require("../../middleware/authenticate")

module.exports = function classRoutes() {
  const repository = new ClassRepository(ClassModel)
  const controller = new ClassController(repository)
  const router = express.Router()

  router.use(authenticate)
  router.post("/", authorize("create", Class), controller.create)
  router.post("/join", authorize("join", Class), controller.joinClass)
  router.get("/:classId", authorize("read", Class), controller.findById)

  return router
}
