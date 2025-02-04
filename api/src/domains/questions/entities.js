import generateId from "../utils/generateId.js"
import Entity from "../../core/entity.js"
import Joi from "joi"
import { QUESTION_TYPES } from "../../core/enums.js"

const dbQuestion = Joi.object({
    prompt: Joi.string().required(),
    variables: Joi.array().required(),
    conditions: Joi.array().required(),
    pointValue: Joi.number().integer().required()
})

const dbVariable = Joi.object({
    type: Joi.string()
        .trim()
        .lowercase()
        .valid(...QUESTION_TYPES),
    min: Joi.number().required(),
    max: Joi.number().required(),
    step: Joi.number()
        .integer()
        .greater(0)
        .required()
})

const dbCondition = Joi.object({
    formula: Joi.required(),
    isCorrect: Joi.boolean().required(),
    feedBack: Joi.required()
})
export class Question extends Entity  {
    static validator = dbQuestion
    constructor({prompt, pointValue}){
        this.prompt = prompt,
        this.variables = [],
        this.conditions = [],
        this.pointValue = pointValue
    }

    static toWeb(data){
        return {
            id: data._id,
            prompt: data.prompt,
            variables: data.variables,
            pointValue: data.pointValue
        }
    }
}

export class Variable extends Entity {
    static validator = dbVariable
    constructor({type, min, max, step}){
        this._id = generateId()
        this.type = type
        this.min = min
        this.max = max
        this.step = step   
    }

    static toWeb(data){
        return {
            id: data._id,
            type: data.type,
            min: data.min,
            max: data.max,
            step: data.step
        }
    }
}

export class Condition extends Entity {
    static validator = dbCondition
    constructor({formula, isCorrect, feedBack}){
        this._id = generateId()
        this.formula = formula
        this.isCorrect = isCorrect,
        this.feedBack = feedBack
    }

    static toWeb(data){
        return {
            id: data._id,
            formula: data.formula,
            isCorrect: data.isCorrect,
            feedBack: data.feedBack
        }
    }
}