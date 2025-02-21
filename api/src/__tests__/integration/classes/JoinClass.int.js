const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")

describe("Join Class", () => {
  it("given valid class code and unenrolled student, returns 201 and class id", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(student)
    const klass = builder.class({owner: teacher._id})
    await builder.seed()

    const res = await request.classes.post('/join', {joinCode: klass.joinCode}, token)
    const returnedClass = res.body.class
    expect(res.status).toBe(200)
    expect(returnedClass).toBe(klass._id.toHexString())
  })

  it("given valid class code and already enrolled student, returns 422", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(student)
    const klass = builder.class({owner: teacher._id, roster: [{student: student._id, joinDate: new Date()}]})
    await builder.seed()

    const res = await request.classes.post('/join', {joinCode: klass.joinCode}, token)
    expect(res.status).toBe(422)
  })

  it("given valid class code and already dropped student, returns 422", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(student)
    const klass = builder.class({owner: teacher._id, droppedStudents: [{student: student._id, dropDate: new Date()}]})
    await builder.seed()

    const res = await request.classes.post('/join', {joinCode: klass.joinCode}, token)
    expect(res.status).toBe(422)
  })

  it("given valid class code and teacher request, returns 403", async () => {
    const teacher = builder.user.teacher()
    const token = builder.token(teacher)
    const klass = builder.class({owner: builder.randomId()})
    await builder.seed()

    const res = await request.classes.post('/join', {joinCode: klass.joinCode}, token)
    expect(res.status).toBe(403)
  })
})
