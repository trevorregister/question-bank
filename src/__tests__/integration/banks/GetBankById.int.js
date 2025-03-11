const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Get bank by id", () => {
  it("returns bank and 200", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const bank = builder.bank({ owner: user._id })
    await builder.seed()

    const res = await request.banks.get(`/${bank._id}`, token)
    const { id, name, description } = res.body
    expect(res.status).toBe(200)
    expect({
      id,
      name,
      description,
    }).toEqual({
      id: id,
      name: name,
      description: description,
    })
  })
})
