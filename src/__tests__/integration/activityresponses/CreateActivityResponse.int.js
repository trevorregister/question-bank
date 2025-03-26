const builder = require("../../../db-seed/builder.js")
const request = require("../setup.js")
const { faker } = builder

describe("Create activity response", () => {
  it("given valid inputs, returns new activity response and 201", async () => {
    const user = builder.user.teacher()
    const teacherActivity = builder.activity({ owner: user._id })
    const activityVariables = teacherActivity.sections
      .map((section) => {
        return section.questions.map((question) => question.variables).flat()
      })
      .flat()
    const studentName = faker.lorem.word()
    await builder.seed()

    const res = await request.activityresponses.post("/", {
      activityCode: teacherActivity.code,
      student: studentName,
    })
    const { id, activity, teacher, student, totalScore, variables, responses } =
      res.body
    expect(res.status).toBe(201)
    expect(id).toBeTruthy()
    expect({
      activity,
      teacher,
      student,
      totalScore,
    }).toEqual({
      activity: teacherActivity._id.toHexString(),
      teacher: user._id.toHexString(),
      student: studentName,
      totalScore: 0,
    })
    variables.forEach((variable) => {
      expect(activityVariables.some((v) => v.id === variable.id)).toBe(true)
      expect(activityVariables.some((v) => v.label === variable.label)).toBe(
        true,
      )
    })
  })
})
