const builder = require("../../../db-seed/builder.js")
const generateId = require("../../../domains/utils/generateId.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create Class", () => {
  it("given valid inputs, returns new class and 201", async () => {
    const user = builder.user.teacher()
    const token = builder.token(user)
    await builder.seed()

    const props = {
      name: faker.lorem.sentence(),
    }
    const res = await request.classes.post("/", props, token)
    const { id, name, owner, roster, droppedStudents, joinCode } = res.body

    expect(res.status).toBe(201)
    expect({
      name,
      owner,
      roster,
      droppedStudents,
    }).toEqual({
      name: props.name,
      owner: user._id.toHexString(),
      roster: [],
      droppedStudents: [],
    })
    expect(id).toBeTruthy()
    expect(joinCode).toBeTruthy()
  })

  it("given student request, returns 403", async () => {
    const user = builder.user.student()
    const token = builder.token(user)
    await builder.seed()

    const props = {
      name: faker.lorem.sentence(),
    }
    const res = await request.classes.post("/", props, token)
    expect(res.status).toBe(403)
  })
})
