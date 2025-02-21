const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Get my classes", () => {
  it("given request from owner teacher, returns array of user classes and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const klassA = builder.class({ owner: user._id })
    const klassB = builder.class({ owner: user._id })
    const klassC = builder.class({ owner: builder.randomId() })
    await builder.seed()

    const res = await request.classes.get(`/owner/${user._id}`, token)
    expect(res.status).toBe(200)
    expect(res.body.length).toBe(2)
    res.body.forEach((c) => {
      const { owner } = c
      expect(owner).toBe(user._id.toHexString())
    })
  })

  it("given request from non-owner teacher, returns 403", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const res = await request.classes.get(`/owner/${builder.randomId()}`, token)
    expect(res.status).toBe(403)
  })
})
