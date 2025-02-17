const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Activity", () => {
  it("given valid inputs, returns new activity and 201", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const sectionsProp = [builder.activity.section()]
    const tagsProp = [faker.lorem.word(5)]
    const props = { name: faker.lorem.sentence(5), sections: sectionsProp, tags: tagsProp }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(201)
    const { id, owner, sections, isArchived, tags, questionCount, name } = res.body
    expect(owner).toBe(user._id.toHexString())
    expect(id).toBeTruthy()
    expect({
      isArchived,
      questionCount,
      name
    }).toEqual({
      isArchived: false,
      questionCount: 0,
      name: props.name
    })
    expect(sections[0].questions.length).toBe(sectionsProp[0].questions.length)
    tags.forEach(t => {
      expect(tagsProp.some(tag => t)).toBe(true)
    })
  })

  it("given invalid props, returns 422", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const props = { name: 123 }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(422)
  })

  it("given request from student, returns 403", async () => {
    const user = await builder.user.student()
    const token = builder.token(user)
    const props = { name: faker.lorem.sentence(5) }
    const res = await request.activities.post("/", props, token)

    expect(res.status).toBe(403)
  })
})
