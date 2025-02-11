const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')


describe('Delete condition', () => {

    it('returns question with deleted condition removed and 201', async () => {
        const user = await builder.user.teacher()
        const token = builder.token(user)

        const question = await builder.question({owner: user._id})
        const conditionId = question.conditions[0].id
        const res = await request.questions.delete(`/${question._id}/condition/${conditionId}`, token)

        expect(res.status).toBe(201)
        
        const { id, conditions } = res.body
        expect(id).toBe(question._id.toHexString())
        expect(conditions.some(c => c.id === conditionId)).toBe(false)
    })
})