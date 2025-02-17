const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Update activity", () => {
  it("Returns updated activity and 200", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const activity = await builder.activity({owner: user._id})
    const getActivityRes = await request.activities.get(`/${activity._id}`, token)
    const retrievedActivity  = getActivityRes.body

    const newName = faker.lorem.sentence(5)
    const newTag = faker.lorem.word(6)
    const newIsArchived = faker.number.int({min: 1, max: 20})%2 === 0 ? true: false
    const newQuestionIds = Array.from({length: faker.number.int({min: 1, max: 5})}, () => builder.randomId())

    const additionalSection = await builder.activity.section({questions: newQuestionIds})
    retrievedActivity.sections.push(additionalSection)
    retrievedActivity.name = newName,
    retrievedActivity.tags.push(newTag)
    retrievedActivity.isArchived = newIsArchived

    const res = await request.activities.patch(`/${activity._id}`,retrievedActivity, token)
    const { id, name, owner, isArchived, tags, sections } = res.body
    
    expect(res.status).toBe(200)
    expect({
        id,
        name,
        owner,
        isArchived
    }).toEqual({
        id: activity._id.toHexString(),
        name: newName,
        owner: user._id.toHexString(),
        isArchived: newIsArchived
    })
    expect(tags.some(tag => newTag)).toBe(true)
    expect(sections.length).toBe(activity.sections.length + 1)
  })

  it("given invalid inputs, returns 422", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const activity = await builder.activity({owner: user._id})
    const getActivityRes = await request.activities.get(`/${activity._id}`, token)
    const retrievedActivity  = getActivityRes.body

    const newName = 123
    const newTag = 456
    const newIsArchived = "asdf"
    const newQuestionIds = Array.from({length: faker.number.int({min: 1, max: 5})}, () => builder.randomId())

    const additionalSection = await builder.activity.section({questions: newQuestionIds})
    retrievedActivity.sections.push(additionalSection)
    retrievedActivity.name = newName,
    retrievedActivity.tags.push(newTag)
    retrievedActivity.isArchived = newIsArchived

    const res = await request.activities.patch(`/${activity._id}`,retrievedActivity, token)    
    expect(res.status).toBe(422)
  })

  it("given non-owner request, returns 403", async () => {
    const user = await builder.user.teacher()
    const token = builder.token(user)
    const activity = await builder.activity({owner: builder.randomId()})
    const res = await request.activities.patch(`/${activity._id}`, {}, token)
    expect(res.status).toBe(403)
  })
})
