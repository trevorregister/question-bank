const { AbilityBuilder, createMongoAbility } = require("@casl/ability")
const {
  Question,
  User,
  Bank,
  Activity,
  Class,
  Assignment,
  AssignmentResponse
} = require("./subjects")
const { USER_ROLES } = require("../../core/enums")
const { TypeError, HttpError } = require("../../core/errors")

module.exports = class AbilityFactory {
  static defineAbilitiesFor(actor) {
    const { can, cannot, rules } = new AbilityBuilder(createMongoAbility)

    const { role } = actor
    if (!role) {
      throw new HttpError(400, "role required")
    }
    switch (role) {
      case USER_ROLES.Admin:
        defineAdminRules(can, cannot, actor)
        break
      case USER_ROLES.Teacher:
        defineTeacherRules(can, cannot, actor)
        break
      case USER_ROLES.Student:
        defineStudentRules(can, cannot, actor)
        break
      default:
        throw new TypeError(role)
    }

    return createMongoAbility(rules)
  }
}

function defineTeacherRules(can, cannot, actor) {
  can("create", [Question, Bank, Activity, Class, Assignment])
  can(
    ["read", "update", "delete"],
    [Question, Bank, Activity, Class, Assignment],
    {
      owner: actor.id,
    },
  )
  can(["read", "update"], [User], { id: actor.id })
}

function defineStudentRules(can, cannot, actor) {
  can(["read", "update"], [User], { id: actor.id })
  can(["read", "update"], [AssignmentResponse], { owner: actor.id })
  can(["join"], [Class])
}
