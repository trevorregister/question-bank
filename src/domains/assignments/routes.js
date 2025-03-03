const express = require("express")
const AssignmentModel = require("./data-access/model")
const AssignmentRepository = require("./repository")
const AssignmentController = require("./controller")
const { Assignment, Class } = require("../auth/subjects")
const authorize = require("../../middleware/authorize")

module.exports = function assignmentRoutes() {
  const repository = new AssignmentRepository(AssignmentModel)
  const controller = new AssignmentController(repository)
  const router = express.Router()

  router.post(
    "/",
    authorize("update", Class),
    authorize("create", Assignment),
    controller.create,
  )
  router.delete(
    "/:assignmentId",
    authorize("delete", Assignment),
    controller.delete,
  )
  router.get(
    "/:assignmentId/responses",
    authorize("read", Assignment),
    controller.getResponsesForAssignment,
  )

  return router
}
