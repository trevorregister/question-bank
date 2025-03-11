const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const jwt = require("jsonwebtoken")

describe("Login with email and password", () => {
  it("given correct credentials, returns valid token and 200", async () => {
    const user = builder.user.teacher()
    await builder.seed()

    const res = await request.users.post(`/login/email-password`, {
      email: user.email,
      password: "asdf",
    })
    const { id, role } = res.body

    expect(res.status).toBe(200)
    expect({
      id,
      role,
    }).toEqual({
      id: user._id.toHexString(),
      role: user.role,
    })
  })

  it("given correct email but wrong password, returns 401", async () => {
    const user = builder.user.teacher()
    await builder.seed()

    const res = await request.users.post(`/login/email-password`, {
      email: user.email,
      password: "incorrect password",
    })
    expect(res.status).toBe(401)
  })
})
