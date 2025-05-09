const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Archive activity", () => {
  it("returns 204 and activity is archived", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const activity = builder.activity({ owner: user._id, isArchived: false })
    await builder.seed()

    const res = await request.activities.patch(
      `/${activity._id}/archive`,
      {},
      token,
    )
    const updatedActivityRes = await request.activities.get(
      `/${activity._id}`,
      token,
    )
    const { isArchived } = updatedActivityRes.body
    expect(res.status).toBe(204)
    expect(isArchived).toBe(true)
  })

  it("given non-owner request, returns 403", async () => {
    const userA = builder.user.teacher()
    const userB = builder.user.teacher()
    const token = builder.token(userB)
    const activity = builder.activity({ owner: userA._id, isArchived: false })
    await builder.seed()

    const res = await request.activities.patch(
      `/${activity._id}/archive`,
      {},
      token,
    )
    expect(res.status).toBe(403)
  })
})
