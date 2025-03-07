const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require("../setup.js")
const { faker } = builder
const { QUESTION_TYPES, VARIABLE_TYPES } = require("../../../core/enums.js")

describe("Create Question", () => {
  it("given valid inputs, returns new question and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: QUESTION_TYPES.Numerical,
      variables: [
        {
          id: faker.lorem.word(),
          label: faker.lorem.word(),
          min: faker.number.int({ min: 1, max: 10 }),
          max: faker.number.int({ min: 11, max: 25 }),
          step: faker.number.int(),
          type: VARIABLE_TYPES.Random,
        },
      ],
      conditions: [],
    }
    const res = await request.questions.post("/", questionProps, token)

    expect(res.status).toBe(201)
    const { id, prompt, variables, conditions, pointValue, owner, type } =
      res.body
    console.log(variables)
    expect({
      prompt,
      variables,
      conditions,
      pointValue,
      owner,
      type,
    }).toEqual({
      prompt: questionProps.prompt,
      variables: questionProps.variables,
      conditions: questionProps.conditions,
      pointValue: questionProps.pointValue,
      owner: user._id.toHexString(),
      type: questionProps.type,
    })
    expect(id).toBeTruthy()
  })

  it("given invalid inputs, returns 422", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: "asdf",
    }
    const res = await request.questions.post("/", questionProps, token)
    expect(res.status).toBe(422)
  })

  it("given valid inputs and student user returns 403", async () => {
    const user = builder.user.student()
    const token = builder.token(user)

    const questionOwner = generateId()
    const questionProps = {
      prompt: faker.lorem.sentence(10),
      pointValue: faker.number.int({ min: 10, max: 50 }),
      type: QUESTION_TYPES.Numerical,
      owner: questionOwner,
    }
    const res = await request.questions.post("/", questionProps, token)

    expect(res.status).toBe(403)
  })
})
