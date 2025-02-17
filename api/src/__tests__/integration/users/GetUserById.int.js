const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("getUserById", () => {
  it("returns user and 200", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const res = await request.users.get(`/${user.id}`, token)
    expect(res.status).toBe(200)
  })

  it("when requesting a different user than the actor, returns 403", async () => {
    const userA = await builder.user.teacher()
    const userB = await builder.user.teacher()
    const token = builder.token(userA)
    const res = await request.users.get(`/${userB._id}`, token)
    expect(res.status).toBe(403)
  })
})
