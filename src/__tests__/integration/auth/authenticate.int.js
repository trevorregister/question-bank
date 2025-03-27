const request = require("../setup.js")
const generateId = require("../../../domains/utils/generateId.js")

describe("Authentication route protection", () => {
  it("given unauthenticated request to protected route, returns 401", async () => {
    const res = await request.users.get(`/${generateId()}`)

    expect(res.status).toBe(401)
  })

  it("given request for db-seed without token, returns 403", async () => {
    const res = await request.seed.post("/", {})

    expect(res.status).toBe(403)
  })

  it("given request for db-seed with invalid token, returns 403", async () => {
    const headers = {
      Authorization: "Bearer invalid-token",
    }
    const res = await request.seed.post("/", {}, headers)

    expect(res.status).toBe(403)
  })
})
