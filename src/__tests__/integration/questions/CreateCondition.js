const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create condition", () => {
  it("given valid inputs, returns question with new condition and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)

    const expression = faker.lorem.word(10)
    const isCorrect = faker.number.int(100) % 2 === 0 ? true : false
    const feedback = faker.lorem.sentence(10)
    const conditionProps = {
      expression: expression,
      isCorrect: isCorrect,
      feedback: feedback,
    }
    const question = builder.question({
      conditions: [],
      owner: user._id,
      variables: [],
    })
    await builder.seed()

    const res = await request.questions.post(
      `/${question._id}/condition`,
      conditionProps,
      token,
    )

    expect(res.status).toBe(201)

    const { id, prompt, variables, conditions, pointValue, owner, type } =
      res.body
    expect({
      id,
      prompt,
      variables,
      conditions,
      pointValue,
      owner,
      type,
    }).toEqual({
      id: question._id.toHexString(),
      prompt: question.prompt,
      conditions: [
        {
          id: conditions[0].id,
          expression: expression,
          feedback: feedback,
          isCorrect: isCorrect,
        },
      ],
      variables: [],
      pointValue: question.pointValue,
      owner: question.owner.toHexString(),
      type: question.type,
    })
  })

  it("given invalid inputs, returns 422", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const feedback = faker.lorem.sentence(10)
    const conditionProps = {
      expression: 123,
      isCorrect: "isCorrect",
      feedback: feedback,
    }
    const question = builder.question({ owner: user._id })
    await builder.seed()

    const res = await request.questions.post(
      `/${question._id}/condition`,
      conditionProps,
      token,
    )
    expect(res.status).toBe(422)
  })

  it("given valid inputs and bad credentials, returns 403", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    const expression = faker.lorem.word(10)
    const isCorrect = faker.number.int(100) % 2 === 0 ? true : false
    const feedback = faker.lorem.sentence(10)
    const conditionProps = {
      expression: expression,
      isCorrect: isCorrect,
      feedback: feedback,
    }
    const question = builder.question({ owner: generateId() })
    await builder.seed()

    const res = await request.questions.post(
      `/${question._id}/condition`,
      conditionProps,
      token,
    )
    expect(res.status).toBe(403)
  })
})
