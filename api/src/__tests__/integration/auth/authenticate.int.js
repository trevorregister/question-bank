const request = require("../setup.js")
const generateId = require("../../../domains/utils/generateId.js")

describe("Authentication route protection", () => {
  it("given unauthenticated request to protected route, returns 401", async () => {
    const res = await request.users.get(`/${generateId()}`)

    expect(res.status).toBe(401)
  })
})
