const builder = require("../db-seed/builder")
const connect = require("../../config/db")
const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require("../domains/activities/data-access/model")
const dotenv = require("dotenv").config()

async function init() {
  await connect("local")
  await UserModel.deleteMany({})
  await QuestionModel.deleteMany({})
  await BankModel.deleteMany({})
  await ActivityModel.deleteMany({})
}

async function buildUsers() {
  const teachers = []
  for (let i = 0; i < 10; i++) {
    const teacher = builder.user.teacher({ email: `user${i + 1}@asdf.com` })
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
    teachers.push(teacher)
    UserModel.create(teacher)
    BankModel.create(bank)

    const section = builder.activity.section({
      questions: questions.map((q) => {
        return {
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
