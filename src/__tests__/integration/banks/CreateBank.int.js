const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Bank", () => {
  it("given valid inputs, returns new bank and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const bankProps = {
      name: faker.lorem.word(),
      owner: user._id,
      description: faker.lorem.sentence(),
    }

    const res = await request.banks.post("/", bankProps, token)
    const { id, owner, name, isDeleted, isArchived, questions, description } =
      res.body

    expect(res.status).toBe(201)
    expect({
      owner,
      name,
      isDeleted,
      isArchived,
      questions,
      description,
    }).toEqual({
      owner: user._id.toHexString(),
      name: bankProps.name,
      description: bankProps.description,
      isDeleted: false,
      isArchived: false,
      questions: [],
    })
    expect(id).toBeTruthy()
  })
})
