const builder = require("../db-seed/builder")
const connect = require("../../config/db")
const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require('../domains/activities/data-access/model')
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
    const teacher = builder.user.teacher({email: `user${i+1}@asdf.com`})
    const questionIds = []
    for (let i = 0; i < 10; i++) {
      const question = builder.question({ owner: teacher._id })
      questionIds.push(question._id)
      QuestionModel.create(question)
    }
    const bank = builder.bank({
      owner: teacher._id,
      questions: questionIds,
    })
    teachers.push(teacher)
    UserModel.create(teacher)
    BankModel.create(bank)

    const activity = builder.activity({owner: teacher._id})
    ActivityModel.create(activity)
  }
  return {
    teachers: teachers,
  }
}

async function seed() {
  await init()
  await buildUsers()
  //await buildQuestions(users.teachers)
}

seed()
