const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Update activity", () => {
  it("Returns updated activity and 200", async () => {
    const user = await builder.user.teacher()
    const activity = await builder.activity({owner: user._id, sections: [], tags: []})
    const token = builder.token(user)
    const section = {
      id: builder.randomId(),
      name: faker.lorem.sentence(),
      summary: faker.lorem.sentence(),
      sectionIndex: 0,
      questions: [{
        parent: builder.randomId(),
        type: "numerical",
        prompt: faker.lorem.sentence(),
        pointValue: faker.number.int(),
        variables: [{
          id: builder.randomId(),
          type: 'random',
          min: faker.number.int({min: 1, max: 10}),
          max: faker.number.int({min: 11, max: 20}),
          step: faker.number.int()
        }],
        conditions: [{
          id: builder.randomId(),
          expression: faker.lorem.sentence(),
          isCorrect: faker.number.int()%2 === 0? true: false,
          feedback: faker.lorem.sentence()

        }]
      }]
    }
    const addedTag = faker.lorem.word()
    const newName = faker.lorem.sentence()

    const activityRes = await request.activities.get(`/${activity._id}`, token)
    activityRes.body.sections.push(section)
    activityRes.body.name = newName
    activityRes.body.tags.push(addedTag)
    
    const res = await request.activities.post("/", activityRes.body, token)
    const { id, owner, sections, isArchived, tags, name } = res.body

    expect(res.status).toBe(201)
    expect({
      owner,
      isArchived,
      name
    }).toEqual({
      owner: user._id.toHexString(),
      isArchived: false,
      name: newName
    })
    expect(id).toBeTruthy()
    expect(tags[0]).toBe(addedTag)
    expect(sections[0]).toEqual({
      id: section.id.toHexString(),
      name: section.name,
      summary: section.summary,
      sectionIndex: section.sectionIndex,
      questions: [{
        parent: section.questions[0].parent.toHexString(),
        type: section.questions[0].type,
        prompt: section.questions[0].prompt,
        pointValue: section.questions[0].pointValue,
        variables: [{
          id: section.questions[0].variables[0].id.toHexString(),
          type: section.questions[0].variables[0].type,
          min: section.questions[0].variables[0].min,
          max: section.questions[0].variables[0].max,
          step: section.questions[0].variables[0].step
        }],
        conditions: [{
          id: section.questions[0].conditions[0].id.toHexString(),
          expression: section.questions[0].conditions[0].expression,
          isCorrect: section.questions[0].conditions[0].isCorrect,
          feedback: section.questions[0].conditions[0].feedback
        }]
      }]
    })
  })

  it("given non-owner request, returns 403", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const activity = await builder.activity({owner: builder.randomId()})
    const res = await request.activities.patch(`/${activity._id}`, {}, token)
    expect(res.status).toBe(403)
  })
})
