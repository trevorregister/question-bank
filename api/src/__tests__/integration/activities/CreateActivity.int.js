const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Activity", () => {
  it("given valid inputs, returns new activity and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const section = {
      name: faker.lorem.sentence(),
      summary: faker.lorem.sentence(),
      sectionIndex: 0,
      questions: [
        {
          parent: builder.randomId(),
          type: "numerical",
          prompt: faker.lorem.sentence(),
          pointValue: faker.number.int({ min: 1, max: 100 }),
          variables: [
            {
              id: builder.randomId(),
              type: "random",
              min: faker.number.int({ min: 1, max: 10 }),
              max: faker.number.int({ min: 11, max: 20 }),
              step: faker.number.int(),
            },
          ],
          conditions: [
            {
              id: builder.randomId(),
              expression: faker.lorem.sentence(),
              isCorrect: faker.number.int() % 2 === 0 ? true : false,
              feedback: faker.lorem.sentence(),
            },
          ],
        },
      ],
    }
    const tagsProp = [faker.lorem.word(5)]
    const props = {
      name: faker.lorem.sentence(5),
      sections: [section],
      tags: tagsProp,
    }
    const res = await request.activities.post("/", props, token)
    const { id, owner, sections, isArchived, tags, name } = res.body

    expect(res.status).toBe(201)
    expect({
      owner,
      isArchived,
      name,
    }).toEqual({
      owner: user._id.toHexString(),
      isArchived: false,
      name: props.name,
    })
    expect(id).toBeTruthy()
    expect(tags[0]).toBe(tagsProp[0])
    expect(sections[0]).toEqual({
      id: expect.any(String),
      name: section.name,
      summary: section.summary,
      sectionIndex: section.sectionIndex,
      questions: [
        {
          parent: section.questions[0].parent.toHexString(),
          id: expect.any(String),
          type: section.questions[0].type,
          prompt: section.questions[0].prompt,
          pointValue: section.questions[0].pointValue,
          variables: [
            {
              id: section.questions[0].variables[0].id.toHexString(),
              type: section.questions[0].variables[0].type,
              min: section.questions[0].variables[0].min,
              max: section.questions[0].variables[0].max,
              step: section.questions[0].variables[0].step,
            },
          ],
          conditions: [
            {
              id: section.questions[0].conditions[0].id.toHexString(),
              expression: section.questions[0].conditions[0].expression,
              isCorrect: section.questions[0].conditions[0].isCorrect,
              feedback: section.questions[0].conditions[0].feedback,
            },
          ],
        },
      ],
    })
  })

  it("given invalid props, returns 422", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)

    await builder.seed()
    const props = { name: 123 }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(422)
  })

  it("given request from student, returns 403", async () => {
    const user = builder.user.student()
    const token = builder.token(user)
    const props = { name: faker.lorem.sentence(5) }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(403)
  })
})
