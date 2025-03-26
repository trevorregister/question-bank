const builder = require("../db-seed/builder")
const connect = require("../../config/db")
const generateRandomVariableValue = require("../domains/utils/generateRandomVariableValue")
const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require("../domains/activities/data-access/model")
const ClassModel = require("../domains/classes/data-access/model")
const AssignmentModel = require("../domains/assignments/data-access/model")
const AssignmentResponseModel = require("../domains/responses/data-access/model")
const ActivityResponseModel = require("../domains/activityresponses/data-access/model")
const dotenv = require("dotenv").config()

async function init() {
  await connect("local")
  await UserModel.deleteMany({})
  await QuestionModel.deleteMany({})
  await BankModel.deleteMany({})
  await ActivityModel.deleteMany({})
  await ClassModel.deleteMany({})
  await AssignmentModel.deleteMany({})
  await AssignmentResponseModel.deleteMany({})
  await ActivityResponseModel.deleteMany({})
}

async function buildUsers() {
  const teachers = []
  const students = []
  for (let i = 0; i < 10; i++) {
    const teacher = builder.user.teacher({ email: `teacher${i + 1}@asdf.com` })
    const questions = []
    for (let i = 0; i < 10; i++) {
      const question = builder.question({ owner: teacher._id })
      questions.push(question)
      QuestionModel.create(question)
    }
    const bank = builder.bank({
      owner: teacher._id,
      questions: questions.map((q) => q._id),
    })
    const klass = builder.class({
      owner: teacher._id,
      roster: students.map((student) => {
        return {
          student: student._id,
          joinDate: new Date(),
        }
      }),
    })
    teachers.push(teacher)
    UserModel.create(teacher)
    BankModel.create(bank)
    ClassModel.create(klass)

    const section = builder.activity.section({
      questions: questions.map((q) => {
        return {
          id: builder.randomId().toHexString(),
          parent: q._id,
          prompt: q.prompt,
          variables: q.variables,
          conditions: q.conditions,
          pointValue: q.pointValue,
          type: q.type,
        }
      }),
    })
    const activity = builder.activity({
      owner: teacher._id,
      sections: [section],
    })
    const assignment = builder.assignment({
      owner: teacher._id,
      class: klass._id,
      activity: activity._id,
    })
    for (let i = 0; i < 10; i++) {
      const activityVariables = questions
        .map((question) => {
          return question.variables
        })
        .flat()
      const activityResponseVariables = activityVariables.map((variable) => {
        return builder.activityResponse.variable({
          id: variable.id,
          label: variable.label,
          value: generateRandomVariableValue({
            min: variable.min,
            max: variable.max,
            step: variable.step,
          }),
        })
      })
      const activityResponse = builder.activityResponse({
        activity: activity._id,
        teacher: teacher._id,
        variables: activityResponseVariables,
      })
      ActivityResponseModel.create(activityResponse)
    }
    AssignmentModel.create(assignment)
    ActivityModel.create(activity)
  }
  return {
    teachers: teachers,
  }
}

async function seed() {
  await init()
  await buildUsers()
}

seed()
