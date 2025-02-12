const { AbilityBuilder , createMongoAbility, } = require('@casl/ability')
const { 
    QuestionSub, 
    UserSub
} = require('./subjects')
const { USER_ROLES } = require('../../core/enums')
const { TypeError, HttpError } = require('../../core/errors')

module.exports = class AbilityFactory {
    static defineAbilitiesFor(actor){
        const { can, cannot, rules } = new AbilityBuilder(createMongoAbility)

        const { role } = actor
        if(!role){
            throw new HttpError(400, 'role required')
        }
        switch(role){
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

function defineTeacherRules(can, cannot, actor){
    can('create', [QuestionSub])
    can(['read, update, delete'], [QuestionSub], {ownerId: actor.id})
    can(['read, update'], [UserSub], {ownerId: actor.id})
}


/* const actor = {
    id: 'asdf',
    role: USER_ROLES.Teacher
}

const ability = AbilityFactory.defineAbilitiesFor(actor)
const questionSub = new QuestionSub()
console.log(ability.can('read',  QuestionSub)) */