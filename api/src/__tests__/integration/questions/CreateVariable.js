const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder
const { VARIABLE_TYPES, QUESTION_TYPES } = require('../../../core/enums.js')


describe('Create Variable', () => {

    it('given valid inputs, returns question with new variable and 201', async () => {
        const min = faker.number.int({min: 1, max: 10})
        const max = faker.number.int({min: 11, max: 20})
        const step = faker.number.int({min: 1, max: 10})
        const variableProps = {
            type: VARIABLE_TYPES.Random,
            min: min,
            max: max,
            step: step

        }
        const question = await builder.question({conditions: []})
        const res = await request.questions.post(`/${question._id}/variable`, variableProps)

        expect(res.status).toBe(201)
        
        const { id, prompt, variables, conditions, pointValue, owner, type } = res.body
        expect({
            id,
            prompt,
            variables,
            conditions,
            pointValue,
            owner,
            type
        }).toEqual({
            id: question._id.toHexString(),
            prompt: question.prompt,
            variables: [{
                id: variables[0].id,
                min: min,
                max: max,
                step: step,
                type: VARIABLE_TYPES.Random
            }],
            conditions: question.conditions,
            pointValue: question.pointValue,
            owner: question.owner.toHexString(),
            type: question.type
        })
    })

    it('given invalid inputs, returns 422', async () => {
        const max = faker.number.int({min: 11, max: 20})
        const step = faker.number.int({min: 1, max: 10})
        const variableProps = {
            type: VARIABLE_TYPES.Random,
            min: "asdf",
            max: max,
            step: step
        }
        const question = await builder.question({conditions: []})
        const res = await request.questions.post(`/${question._id}/variable`, variableProps)
        expect(res.status).toBe(422)
    })

    it('given a min greater than max, returns 422', async () => {
        const max = faker.number.int({min: 11, max: 20})
        const step = faker.number.int({min: 1, max: 10})
        const variableProps = {
            type: VARIABLE_TYPES.Random,
            min: 10,
            max: 1,
            step: step
        }
        const question = await builder.question({conditions: []})
        const res = await request.questions.post(`/${question._id}/variable`, variableProps)
        expect(res.status).toBe(422)
    })
})