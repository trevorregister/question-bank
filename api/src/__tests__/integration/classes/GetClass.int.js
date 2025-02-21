const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Get Class", () => {
  it("given request from teacher, returns class and 200", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)
    const rosteredStudent = builder.class.rosteredStudent()
    const droppedStudent = builder.class.droppedStudent()
    const klass = builder.class({owner: teacher._id, roster: [rosteredStudent], droppedStudents: [droppedStudent]})
    await builder.seed()

    const res = await request.classes.get(`/${klass._id}/`, token)
    const { id, name, owner, roster, droppedStudents, joinCode, isArchived } = res.body
    expect(res.status).toBe(200)
    expect({
        id,
        name,
        owner,
        joinCode,
        isArchived
    }).toEqual({
        id: klass._id.toHexString(),
        name: klass.name,
        owner: teacher._id.toHexString(),
        joinCode: klass.joinCode,
        isArchived: klass.isArchived
    })
    expect(roster.some(seat => seat.student === rosteredStudent.student.toHexString())).toBe(true)
    expect(droppedStudents.some(seat => seat.student === droppedStudent.student.toHexString())).toBe(true)

  })

  it("given request from non-owner teacher, returns 403", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)

    const klass = builder.class({owner: builder.randomId()})
    await builder.seed()

    const res = await request.classes.get(`/${klass._id}/`, token)

    expect(res.status).toBe(403)
  })
})
