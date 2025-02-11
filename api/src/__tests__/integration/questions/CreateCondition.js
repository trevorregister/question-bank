const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder
const { VARIABLE_TYPES } = require('../../../core/enums.js')


describe('Create condition', () => {

    it('given valid inputs, returns question with new condition and 201', async () => {
        const expression = faker.lorem.word(10)
        const isCorrect = faker.number.int(100)%2 === 0 ? true : false
        const feedback = faker.lorem.sentence(10)
        const conditionProps = {
            expression: expression,
            isCorrect: isCorrect,
            feedback: feedback

        }
        const question = await builder.question({conditions: []})
        const res = await request.questions.post(`/${question._id}/condition`, conditionProps)

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
            conditions: [{
                id: conditions[0].id,
                expression: expression,
                feedback: feedback,
                isCorrect: isCorrect
                
            }],
            variables: [],
            pointValue: question.pointValue,
            owner: question.owner.toHexString(),
            type: question.type
        })
    })

    it('given invalid inputs, returns 422', async () => {
        const feedback = faker.lorem.sentence(10)
        const conditionProps = {
            expression: 123,
            isCorrect: 'isCorrect',
            feedback: feedback

        }
        const question = await builder.question()
        const res = await request.questions.post(`/${question._id}/condition`, conditionProps)
        expect(res.status).toBe(422)
    })
})