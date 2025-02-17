const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Activity", () => {
  it("given valid inputs, returns new activity and 201", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const props = { name: faker.lorem.sentence(5), owner: user._id }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(201)
    expect(res.body.owner).toBe(user._id.toHexString())
  })
})
