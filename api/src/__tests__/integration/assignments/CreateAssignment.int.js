const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Assignment", () => {
  it("given valid inputs, returns new assignment and 201", async () => {
    const user = builder.user.teacher()
    const klass = builder.class({ owner: user._id })
    const dbActivity = builder.activity({ owner: user._id })
    const token = builder.token(user)
    await builder.seed()

    const assignmentProps = {
      owner: user._id,
      activity: dbActivity._id,
      startDate: faker.date.recent(),
      dueDate: faker.date.soon(),
      klass: klass._id,
    }

    const res = await request.assignments.post(`/`, assignmentProps, token)
    const { id, owner, activity, startDate, dueDate } = res.body

    expect(res.status).toBe(201)
    expect({
      owner,
      activity,
      startDate,
      dueDate,
    }).toEqual({
      owner: user._id.toHexString(),
      activity: assignmentProps.activity.toHexString(),
      startDate: assignmentProps.startDate.toISOString(),
      dueDate: assignmentProps.dueDate.toISOString(),
    })
    expect(id).toBeTruthy()
    expect(res.body.class).toEqual(klass._id.toHexString())
  })

  it("given class non-owner request, returns 403", async () => {
    const user = builder.user.teacher()
    const klass = builder.class({ owner: builder.randomId() })
    const dbActivity = builder.activity({ owner: user._id })
    const token = builder.token(user)
    await builder.seed()

    const assignmentProps = {
      owner: user._id,
      activity: dbActivity._id,
      startDate: faker.date.recent(),
      dueDate: faker.date.soon(),
      klass: klass._id,
    }

    const res = await request.assignments.post(`/`, assignmentProps, token)
    expect(res.status).toBe(403)
  })
})
