const express = require("express");
const UserModel = require("../users/data-access/model");
const UserRepository = require("./repository");
const UserController = require("./controller");
const { User } = require("../auth/subjects");
const authorize = require("../../middleware/authorize");
const authenticate = require("../../middleware/authenticate");

module.exports = function userRoutes() {
  const repository = new UserRepository(UserModel);
  const controller = new UserController(repository);
  const router = express.Router();
  router.post("/", controller.create);
  router.post("/login/email-password", controller.loginEmailPassword);

  router.use(authenticate);

  router.get("/:userId", authorize("read", User), controller.findById);

  return router;
};
