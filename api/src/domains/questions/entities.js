import generateId from "../utils/generateId.js"

export class Question {
    constructor({prompt, variables, conditions, value}){
        this.prompt = prompt,
        this.variables = variables,
        this.conditions = conditions,
        this.value = value
    }
}

export class Variable {
    constructor({type, min, max, step}){
        this._id = generateId()
        this.type = type
        this.min = min
        this.max = max
        this.step = step   
    }
}

export class Condition {
    constructor({formula, isCorrect, feedBack}){
        this._id = generateId()
        this.formula = formula
        this.isCorrect = isCorrect,
        this.feedBack = feedBack
    }
}