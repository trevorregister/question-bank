const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder
const AssignmentModel = require('../../../domains/assignments/data-access/model')

describe("Delete Assignment", () => {
  it("deletes assignment and returns 204", async () => {
    const user = builder.user.teacher()
    const assignment = builder.assignment({owner: user._id})
    const token = builder.token(user)
    await builder.seed()

    const res = await request.assignments.delete(`/${assignment._id}`, token)
    const assignmentLookup = await AssignmentModel.findById(assignment._id)
    console.log('lookup', assignmentLookup)

    expect(res.status).toBe(204)
    expect(!!assignmentLookup).toBe(false)
  })

  it("given class non-owner request, returns 403", async () => {
    const user = builder.user.teacher()
    const klass = builder.class({ owner: builder.randomId()})
    const assignment = builder.assignment({owner: builder.randomId()})
    const token = builder.token(user)
    await builder.seed()


    const res = await request.assignments.delete(`/${assignment._id}`, token)
    expect(res.status).toBe(403)
  })
})
