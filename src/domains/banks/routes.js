const express = require("express")
const BankModel = require("./data-access/model")
const BankRepository = require("./repository")
const BankController = require("./controller")
const { Bank } = require("../auth/subjects")
const authorize = require("../../middleware/authorize")

module.exports = function bankRoutes() {
  const repository = new BankRepository(BankModel)
  const controller = new BankController(repository)
  const router = express.Router()

  router.post("/", authorize("create", Bank), controller.create)

  router.get(
    "/owner/:ownerId",
    authorize("read", Bank, (req) => ({ owner: req.params.ownerId })),
    controller.getMyBanks,
  )
  router.get(
    "/:bankId/questions",
    authorize("read", Bank),
    controller.getBankQuestions,
  )
  router.patch(
    "/:bankId/questions/add",
    authorize("update", Bank),
    controller.addQuestionsToBank,
  )
  router.patch(
    "/:bankId/questions/remove",
    authorize("update", Bank),
    controller.removeQuestionsFromBank,
  )
  router.delete("/:bankId", authorize("delete", Bank), controller.deleteBank)

  return router
}
