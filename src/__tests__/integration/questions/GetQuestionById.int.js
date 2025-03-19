const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Get questions by id", () => {
  it("returns question and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const question = builder.question({ owner: user._id })
    await builder.seed()

    const res = await request.questions.get(`/${question._id}/`, token)
    const { id } = res.body

    expect(res.status).toBe(200)
    expect(id).toBe(question._id.toHexString())
  })

  it("given request from non-owner, returns 403", async () => {
    const user = builder.user.teacher()
    const otherUser = builder.user.teacher()
    const token = builder.token(user)
    const question = builder.question({ owner: otherUser._id })
    await builder.seed()

    const res = await request.questions.get(`/${question._id}/`, token)

    expect(res.status).toBe(403)
  })
})
