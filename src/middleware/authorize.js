const { HttpError, NotFoundError } = require("../core/errors")
const AbilityFactory = require("../domains/auth/AbilityFactory")
const AuthRepo = require("../domains/auth/repository")
const {
  Question,
  User,
  Bank,
  Activity,
  Class,
  Assignment,
  AssignmentResponse,
} = require("../domains/auth/subjects")

const authorize = (action, SubjectClass, conditions = undefined) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        throw new HttpError(403, "unauthorized")
      }

      const ability = AbilityFactory.defineAbilitiesFor(req.user)

      if (action === "create" || action === "join") {
        if (!ability.can(action, SubjectClass)) {
          throw new HttpError(403, "forbidden")
        } else {
          return next()
        }
      }

      if (conditions) {
        const evaluatedConditions =
          typeof conditions === "function" ? conditions(req) : conditions

        const subject = new SubjectClass(evaluatedConditions)
        if (!ability.can(action, subject)) {
          throw new HttpError(403, "forbidden")
        } else {
          return next()
        }
      }

      let resource
      let resourceId
      switch (SubjectClass) {
        case Question:
          resourceId = req.params.questionId
          break
        case User:
          resourceId = req.params.userId
          break
        case Bank:
          resourceId = req.params.bankId
          break
        case Activity:
          resourceId = req.params.activityId
          break
        case Class:
          resourceId = req.params.classId ?? req.body.klass
          break
        case Assignment:
          resourceId = req.params.assignmentId
          break
        case AssignmentResponse:
          resourceId = req.params.responseId
          break
        default:
          throw new TypeError(SubjectClass.name)
      }

      resource = await AuthRepo.getResource({ resourceId, SubjectClass })

      if (!resource) {
        throw new NotFoundError(`resource ${SubjectClass.name}`)
      }

      const subject = new SubjectClass(resource)

      if (!ability.can(action, subject)) {
        throw new HttpError(403, "unauthorized")
      }

      next()
    } catch (err) {
      next(err)
    }
  }
}

module.exports = authorize
