const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const ClassModel = require('../../../domains/classes/data-access/model.js')

describe("Unarchive Class", () => {
  it("given request from teacher, unarchives class and returns 204", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)
    const klass = builder.class({owner: teacher._id, isArchived: true})
    await builder.seed()

    const res = await request.classes.patch(`/${klass._id}/unarchive`, {}, token)
    const dbKlass = await ClassModel.findById(klass._id)

    expect(res.status).toBe(204)
    expect(dbKlass.isArchived).toBe(false)

  })

  it("given request from non-owner teacher, returns 403", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)
    const klass = builder.class({owner: builder.randomId()})
    await builder.seed()

    const res = await request.classes.patch(`/${klass._id}/unarchive`, {}, token)
    expect(res.status).toBe(403)
  })

  it("given request from teacher for already unarchived class, returns 422", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)
    const klass = builder.class({owner: teacher._id, isArchived: false})
    await builder.seed()

    const res = await request.classes.patch(`/${klass._id}/unarchive`, {}, token)
    expect(res.status).toBe(422)
  })
})
