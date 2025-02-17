const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Activity", () => {
  it("given valid inputs, returns new activity and 201", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const props = { name: faker.lorem.sentence(5) }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(201)
    expect(res.body.owner).toBe(user._id.toHexString())
  })

  it("given invalid props, returns 422", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const props = { name: 123 }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(422)
  })

  it("given request from student, returns 403", async () => {
    const user = await builder.user.student()
    const token = builder.token(user)
    const props = { name: faker.lorem.sentence(5) }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(403)
  })
})
