const builder = require("../../../db-seed/builder.js")
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
})