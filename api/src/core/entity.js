import { ValidationError } from "./errors.js"

export default class Entity {
    constructor(data){
    }

    static getValidator(){
        throw new Error("child class must implement a validator")
    }

    static toDb(data){
        const validator = this.getValidator()
        const validate = validator.validate(data)

        if (validate.error) {
            throw new ValidationError(validate.error)
        } else {
            return validate.value
        }
    }

    static toWeb(data){

    }
}