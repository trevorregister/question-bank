const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder
const { QUESTION_TYPES } = require('../../../core/enums.js')


describe('Create Question', () => {

    it('given valid inputs, returns new question and 201', async () => {
        const questionOwner = generateId()
        const questionProps = {
            prompt: faker.lorem.sentence(10),
            pointValue: faker.number.int({min: 10, max: 50}),
            type: QUESTION_TYPES.Numerical,
            owner: questionOwner
        }
        const res = await request.questions.post('/', questionProps)
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
            id: id,
            prompt: prompt,
            variables: variables,
            conditions: conditions,
            pointValue: pointValue,
            owner: owner,
            type: type
        })
    })

    it('given invalid inputs, returns 422', async () => {
        const questionProps = {
            prompt: faker.lorem.sentence(10),
            pointValue: faker.number.int({min: 10, max: 50}),
            type: 'asdf',
            owner: '123'
        }
        const res = await request.questions.post('/', questionProps)
        expect(res.status).toBe(422)
    })
})