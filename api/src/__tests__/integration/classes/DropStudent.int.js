const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const ClassModel = require("../../../domains/classes/data-access/model.js")

describe("Drop Class", () => {
  it("given request from teacher for enrolled student, student pushed to dropped students, removed from roster, and return 204", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(teacher)
    const klass = builder.class({
      owner: teacher._id,
      roster: [{ student: student._id, joinDate: new Date() }],
    })
    await builder.seed()

    const dropRes = await request.classes.post(
      `/${klass._id}/drop-student`,
      { studentId: student._id },
      token,
    )
    const dbKlass = await ClassModel.findById(klass._id)

    expect(dropRes.status).toBe(204)
    expect(
      dbKlass.roster.some(
        (seat) => seat.student.toHexString() === student._id.toHexString(),
      ),
    ).toBe(false)
    expect(
      dbKlass.droppedStudents.some(
        (seat) => seat.student.toHexString() === student._id.toHexString(),
      ),
    ).toBe(true)
  })

  it("given request from teacher for dropped student, returns 422", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(teacher)
    const klass = builder.class({
      owner: teacher._id,
      droppedStudents: [{ student: student._id, dropDate: new Date() }],
    })
    await builder.seed()

    const res = await request.classes.post(
      `/${klass._id}/drop-student`,
      { studentId: student._id },
      token,
    )

    expect(res.status).toBe(422)
  })

  it("given request from teacher for non-enrolled student, returns 422", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(teacher)
    const klass = builder.class({ owner: teacher._id })
    await builder.seed()

    const res = await request.classes.post(
      `/${klass._id}/drop-student`,
      { studentId: student._id },
      token,
    )

    expect(res.status).toBe(422)
  })

  it("given request from non-owner teacher, returns 403", async () => {
    const teacher = builder.user.teacher()
    const student = builder.user.student()
    const token = builder.token(teacher)
    const klass = builder.class({
      owner: builder.randomId(),
      droppedStudents: [{ student: student._id, dropDate: new Date() }],
    })
    await builder.seed()

    const res = await request.classes.post(
      `/${klass._id}/drop-student`,
      { studentId: student._id },
      token,
    )

    expect(res.status).toBe(403)
  })
})
