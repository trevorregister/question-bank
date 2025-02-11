const { AbilityBuilder , createMongoAbility, } = require('@casl/ability')
const { 
    QuestionSub 
} = require('./subjects')
const { USER_ROLES } = require('../../core/enums')
const { TypeError } = require('../../core/errors')

module.exports = class AbilityFactory {
    static defineAbilitiesFor(user){
        const { can, cannot, rules } = new AbilityBuilder(createMongoAbility)

        const { role } = user
        switch(role){
            case USER_ROLES.Admin:
                defineAdminRules(can, cannot, user)
                break
            case USER_ROLES.Teacher:
                defineTeacherRules(can, cannot, user)
                break
            case USER_ROLES.Student:
                defineStudentRules(can, cannot, user)
                break
            default:
                throw new TypeError(role)
        }

        return createMongoAbility(rules)

    }
}

function defineTeacherRules(can, cannot, user){
    can('create', [QuestionSub])
    can(['read, update, delete'], [QuestionSub], {ownerId: user.id})
}


/* const user = {
    id: 'asdf',
    role: USER_ROLES.Teacher
}

const ability = AbilityFactory.defineAbilitiesFor(user)
const questionSub = new QuestionSub()
console.log(ability.can('read',  QuestionSub)) */