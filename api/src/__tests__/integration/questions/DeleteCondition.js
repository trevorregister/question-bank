const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require('../setup.js')
const { faker } = builder
const { VARIABLE_TYPES } = require('../../../core/enums.js')


describe('Delete condition', () => {

    it('returns question with deleted condition and 201', async () => {
        const question = await builder.question()
        const conditionId = question.conditions[0].id
        const res = await request.questions.delete(`/${question._id}/condition/${conditionId}`)

        expect(res.status).toBe(201)
        
        const { id, conditions } = res.body
        expect(id).toBe(question._id.toHexString())
        expect(conditions.some(c => c.id === conditionId)).toBe(false)
    })
})