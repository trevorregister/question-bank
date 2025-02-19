const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder
const jwt = require("jsonwebtoken")

describe("Create Bank", () => {
  it("given valid inputs, returns new bank and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const bankProps = {
      name: faker.lorem.word(5),
      owner: user._id,
    }

    const res = await request.banks.post("/", bankProps, token)
    const { id, owner, name, isDeleted, isArchived, questions } = res.body

    expect(res.status).toBe(201)
    expect({
      owner,
      name,
      isDeleted,
      isArchived,
      questions,
    }).toEqual({
      owner: user._id.toHexString(),
      name: bankProps.name,
      isDeleted: false,
      isArchived: false,
      questions: [],
    })
    expect(id).toBeTruthy()
  })
})
