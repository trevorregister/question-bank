const express = require("express")
const ActivityModel = require("./data-access/model")
const ActivityRepository = require("./repository")
const ActivityController = require("./controller")
const authorize = require("../../middleware/authorize")
const { Activity } = require("../auth/subjects")

module.exports = function questionRoutes() {
  const repository = new ActivityRepository(ActivityModel)
  const controller = new ActivityController(repository)
  const router = express.Router()

  router.get(
    "/:activityId",
    authorize("read", Activity),
    controller.getActivityById,
  )
  router.post("/", authorize("create", Activity), controller.create)
  router.patch(
    "/:activityId",
    authorize("update", Activity),
    controller.updateActivity,
  )
  router.patch(
    "/:activityId/archive",
    authorize("update", Activity),
    controller.archiveActivity,
  )
  router.patch(
    "/:activityId/unarchive",
    authorize("update", Activity),
    controller.unarchiveActivity,
  )

  return router
}
