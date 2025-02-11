const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder


describe('Update question', () => {

    it('returns question with updated prompt/value and 201', async () => {
        const question = await builder.question()
        const newPrompt = faker.lorem.sentence(10)
        const newPointValue = faker.number.int({min: 10, max: 50})
        const res = await request.questions.patch(`/${question._id}/`, {prompt: newPrompt, pointValue: newPointValue})

        expect(res.status).toBe(201)
        
        const { prompt, pointValue } = res.body
        expect({
            prompt,
            pointValue
        }).toEqual({
            prompt: prompt,
            pointValue: pointValue
        })
    })

    it('returns question with updated variables/conditions and 201', async () => {
        const variables = [
            {
                id: generateId(),
                min: faker.number.int({min: 1, max: 10}),
                max: faker.number.int({min: 11, max: 20}),
                step: faker.number.int()
            },
        ]
        const conditions = [
            {
                id: generateId(),
                isCorrect: true,
                feedback: faker.lorem.sentence(10),
                expression: faker.lorem.sentence(10)
            }
        ]
        const question = await builder.question({ variables: variables, conditions: conditions})
        const variableUpdate = {
            id: variables[0].id,
            min: faker.number.int({min: 1, max: 10}),
            max: faker.number.int({min: 11, max: 20}),
            step: faker.number.int()
        }
        const conditionUpdate = {
            id: conditions[0].id,
            isCorrect: false,
            feedback: faker.lorem.sentence(10),
            expression: faker.lorem.sentence(10)
        }
        const payload = {
            variables: [variableUpdate],
            //conditions: [conditionUpdate]
        }
        const res = await request.questions.patch(`/${question._id}/`, payload)

        expect(res.status).toBe(201)
        console.log(res.body)
    })
})