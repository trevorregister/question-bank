const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Get activity by id", () => {
  it("returns user and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const activity = builder.activity({ owner: user._id })
    await builder.seed()

    const res = await request.activities.get(`/${activity._id}`, token)
    expect(res.status).toBe(200)
    expect(res.body.id).toBe(activity._id.toHexString())
  })

  it("given non-owner request, returns 403", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const activity = builder.activity({ owner: builder.randomId() })
    await builder.seed()

    const res = await request.activities.get(`/${activity._id}`, token)
    expect(res.status).toBe(403)
  })
})
