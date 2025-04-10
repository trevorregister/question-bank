const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder
const jwt = require("jsonwebtoken")

describe("Get bank questions", () => {
  it("returns array of questions from specified bank and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const questionA = builder.question({ owner: user._id })
    const questionB = builder.question({ owner: user._id })
    const bank = builder.bank({
      owner: user._id,
      questions: [questionA._id, questionB._id],
    })
    await builder.seed()

    const res = await request.banks.get(`/${bank._id}/questions`, token)
    expect(res.status).toBe(200)
    res.body.forEach((q) => {
      const { owner } = q
      expect(owner).toBe(user._id.toHexString())
    })
  })
})
