const express = require("express")
const AssignmentResponseModel = require("./data-access/model")
const AssignmentResponseRepository = require("./repository")
const AssignmentResponseController = require("./controller")
const { AssignmentResponse } = require("../auth/subjects")
const authorize = require("../../middleware/authorize")

module.exports = function studentResponseRoutes() {
  const repository = new AssignmentResponseRepository(AssignmentResponseModel)
  const controller = new AssignmentResponseController(repository)
  const router = express.Router()

  router.post(
    "/",
    //authorize("create", AssignmentResponse),
    controller.create,
  )

  return router
}
