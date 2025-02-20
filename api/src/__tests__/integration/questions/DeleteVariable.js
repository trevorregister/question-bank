const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require("../setup.js")
const { faker } = builder

describe("Delete variable", () => {
  it("returns question with deleted variable removed and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const question = builder.question({
      owner: user._id,
      variables: [
        {
          id: generateId(),
          min: faker.number.int({ min: 1, max: 10 }),
          max: faker.number.int({ min: 11, max: 20 }),
          step: faker.number.int({ min: 1, max: 5 }),
        },
      ],
    })
    await builder.seed()

    console.log("QUESTION", question)
    const variableId = question.variables[0].id
    const res = await request.questions.delete(
      `/${question._id}/variable/${variableId}`,
      token,
    )

    expect(res.status).toBe(201)

    const { id, variables } = res.body
    expect(id).toBe(question._id.toHexString())
    expect(variables.some((v) => v.id === variableId.toHexString())).toBe(false)
  })

  it("given bad credentials, returns 403", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const question = builder.question({
      owner: generateId(),
      variables: [
        {
          id: generateId(),
          min: faker.number.int({ min: 1, max: 10 }),
          max: faker.number.int({ min: 11, max: 20 }),
          step: faker.number.int({ min: 1, max: 5 }),
        },
      ],
    })
    await builder.seed()

    const variableId = question.variables[0].id
    const res = await request.questions.delete(
      `/${question._id}/variable/${variableId}`,
      token,
    )

    expect(res.status).toBe(403)
  })
})
