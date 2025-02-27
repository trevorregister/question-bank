const Joi = require('joi')
const { EVENTS } = require('../core/enums')
const { ValidationError } = require('../core/errors')

const eventValidator = Joi.object({
    name: Joi.string().valid(...Object.values(EVENTS)).required(),
    payload: Joi.any()
})

module.exports = class Event {
    constructor(name, payload){
        const validate = eventValidator.validate({name, payload})
        if(validate.error){
            throw new ValidationError(validate.error)
        }
        else {
        this.name = validate.value.name
        this.payload = validate.value.payload
        this.timestamp = new Date()
        }
    }
}