import Joi from "joi"
import Entity from "../../core/entity.js"
import { USER_ROLES } from "./data-access/schema.js"

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

export default class User extends Entity {
    constructor({email, firstName, lastName, role}){
        super()
        this.email = email,
        this.firstName = firstName,
        this.lastName = lastName,
        this.role = role
    }

    static getValidator(){
        return dbUser
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