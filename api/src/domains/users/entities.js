const Joi = require('joi')
const Entity = require('../../core/entity.js')
const { USER_ROLES } = require('../../core/enums.js')

const dbUser = Joi.object({
    firstName: Joi.string()
        .required()
        .trim(),
    lastName: Joi.string()
        .required()
        .trim(),
    email: Joi.string()
        .required()
        .lowercase()
        .email({minDomainSegments: 2}),
    role: Joi.string()
        .required()
        .valid(...USER_ROLES)
})

module.exports = class User extends Entity {
    static validator = dbUser
    constructor({email, firstName, lastName, role}){
        super()
        this.email = email,
        this.firstName = firstName,
        this.lastName = lastName,
        this.role = role
    }

    static toWeb(data){
        return {
            id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            role: data.role
        }
    }
}