const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Remove questions from bank", () => {
  it("returns bank with updated question array and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const bank = builder.bank({
      owner: user._id,
    })
    await builder.seed()

    const res = await request.banks.delete(`/${bank._id}`, token)
    const { id } = res.body
    expect(res.status).toBe(200)
    expect(id).toBe(bank._id.toHexString())
  })
  it("request from non-owner returns 403", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const bank = builder.bank({
      owner: builder.randomId(),
    })
    await builder.seed()

    const res = await request.banks.delete(`/${bank._id}`, token)
    expect(res.status).toBe(403)
  })
})
