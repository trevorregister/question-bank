const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder


describe('Update question', () => {

    it('returns question with updated prompt, pointValue, variables, and conditions and 201', async () => {
        const variables = [
            {
                id: generateId(),
                min: faker.number.int({min: 1, max: 10}),
                max: faker.number.int({min: 11, max: 20}),
                step: faker.number.int({min: 1, max: 10})
            },
            {
                id: generateId(),
                min: faker.number.int({min: 1, max: 10}),
                max: faker.number.int({min: 11, max: 20}),
                step: faker.number.int({min: 1, max: 10})
            },
        ]
        const conditions = [
            {
                id: generateId(),
                isCorrect: true,
                feedback: faker.lorem.sentence(10),
                expression: faker.lorem.sentence(10)
            },
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
            step: faker.number.int({min: 1, max: 10})
        }
        const conditionUpdate = {
            id: conditions[0].id,
            isCorrect: false,
            feedback: faker.lorem.sentence(10),
        }
        const newPrompt = faker.lorem.sentence(10)
        const newPointValue = faker.number.int({min: 100, max: 200})
        const payload = {
            prompt: newPrompt,
            pointValue: newPointValue,
            variables: [variableUpdate],
            conditions: [conditionUpdate],
            isArchived: true
        }

        const res = await request.questions.patch(`/${question._id}/`, payload)
        const updatedQuestion  = res.body
        const { prompt, pointValue, isArchived, isDeleted } = updatedQuestion

        expect(res.status).toBe(201)
        expect({
            prompt,
            pointValue,
            isArchived,
            isDeleted
        }).toEqual({
            prompt: newPrompt,
            pointValue: newPointValue,
            isArchived: true,
            isDeleted: false
        })
        updatedQuestion.variables.forEach(variable => {
            const { min, max, step } = variable
            if(variable.id === variableUpdate.id.toHexString()){
                expect({
                    min,
                    max,
                    step
                }).toEqual({
                    min: variableUpdate.min,
                    max: variables[0].max,
                    step: variableUpdate.step
                })
            } else {
                expect({
                    min,
                    max,
                    step
                }).toEqual({
                    min: variables[1].min,
                    max: variables[1].max,
                    step: variables[1].step
                })
            }
        })
        updatedQuestion.conditions.forEach(condition => {
            const { isCorrect, feedback, expression } = condition
            if(condition.id === conditionUpdate.id.toHexString()){
                expect({
                    isCorrect,
                    feedback,
                    expression
                }).toEqual({
                    isCorrect: conditionUpdate.isCorrect,
                    feedback: conditionUpdate.feedback,
                    expression: conditions[0].expression
                })
            } else{
                expect({
                    isCorrect,
                    feedback,
                    expression
                }).toEqual({
                    isCorrect: conditions[1].isCorrect,
                    feedback: conditions[1].feedback,
                    expression: conditions[1].expression
                })
            }
        })
    })
})