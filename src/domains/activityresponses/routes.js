const express = require("express")
const ActivityResponseModel = require("./data-access/model")
const ActivityResponseRepository = require("./repository")
const ActivityResponseController = require("./controller")

module.exports = function activityResponseRoutes() {
  const repository = new ActivityResponseRepository(ActivityResponseModel)
  const controller = new ActivityResponseController(repository)
  const router = express.Router()

  router.post(
    "/",
    //authorize("create", AssignmentResponse),
    controller.create,
  )

  return router
}
