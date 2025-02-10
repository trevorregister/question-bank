const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const { faker } = builder


describe('Get questions by owner', () => {

    it('returns question with updated prompt/value and 201', async () => {
        const user = await builder.user.teacher()
        const questionOne = await builder.question({owner: user._id})
        const questionTwo = await builder.question({owner: user._id})

        const res = await request.questions.get(`/owner/${user._id}/`)

        expect(res.status).toBe(201)
        res.body.forEach(question => {
            expect(question.owner === user._id)
        })
    })
})