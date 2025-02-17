const { build, perBuild } = require("@jackfranklin/test-data-bot")
const { faker } = require("@faker-js/faker")
const generateId = require("../domains/utils/generateId")
const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require("../domains/activities/data-access/model")
const { QUESTION_TYPES } = require("../core/enums")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")

faker.seed(123)

const userFields = {
  _id: perBuild(() => generateId()),
  firstName: perBuild(() => faker.person.firstName()),
  lastName: perBuild(() => faker.person.lastName()),
  email: perBuild(() => faker.internet.email().toLowerCase()),
  hash: "$2b$10$2Qt1dVjd.mH/t6h..Xv.JOkuFZ6Pn6kVUimXjDTZl84vYlF8JtNYW",
}

const questionFields = {
  _id: perBuild(() => generateId()),
  prompt: perBuild(() => faker.lorem.sentence(5)),
  variables: [],
  conditions: perBuild(() => generateConditions()),
  pointValue: perBuild(() => faker.number.int({ min: 10, max: 100 })),
  type: QUESTION_TYPES.Numerical,
  owner: perBuild(() => generateId()),
  isArchived: false,
  isDeleted: false,
}

const bankFields = {
  _id: perBuild(() => generateId()),
  name: perBuild(() => faker.lorem.sentence(5)),
  owner: perBuild(() => generateId()),
  questions: [],
  isArchived: false,
  isDeleted: false,
}

const activityFields = {
  _id: perBuild(() => generateId()),
  name: perBuild(() => faker.lorem.sentence(5)),
  owner: perBuild(() => generateId()),
  sections: perBuild(() =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      sectionBuilder(),
    ),
  ),
  isArchived: false,
  tags: perBuild(() => Array.from({ length: 5 }, () => faker.lorem.word())),
  questionCount: 0,
}

const sectionFields = {
  id: perBuild(() => generateId()),
  name: perBuild(() => faker.lorem.sentence(5)),
  questions: perBuild(() =>
    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
      questionBuilder(),
    ),
  ),
  summary: perBuild(() => faker.lorem.sentence(5)),
  sectionIndex: 0,
}

const activityBuilder = build({
  name: "Activity",
  fields: {
    ...activityFields,
  },
  postBuild: (activity) => {
    let sectionIndex = 0
    activity.questionCount = activity.sections.reduce(
      (sum, section) => sum + section.questions.length,
      0,
    )
    activity.sections.forEach((section) => {
      section.sectionIndex = sectionIndex
      sectionIndex++
    })
    return activity
  },
})

const sectionBuilder = build({
  fields: {
    ...sectionFields,
  },
})

const bankBuilder = build({
  name: "Bank",
  fields: {
    ...bankFields,
  },
})

const studentBuilder = build({
  name: "User",
  fields: {
    role: "student",
    ...userFields,
  },
})

const teacherBuilder = build({
  name: "User",
  fields: {
    role: "teacher",
    ...userFields,
  },
})

const questionBuilder = build({
  name: "Question",
  fields: {
    ...questionFields,
  },
})

function generateConditions() {
  return [
    {
      id: generateId(),
      expression: faker.lorem.word(10),
      isCorrect: true,
      feedback: faker.lorem.sentence(10),
    },
    {
      id: generateId(),
      expression: faker.lorem.word(10),
      isCorrect: false,
      feedback: faker.lorem.sentence(10),
    },
  ]
}

function applyOverrides(builderInstance, overrides) {
  for (const key in overrides) {
    if (overrides.hasOwnProperty(key)) {
      builderInstance[key] = overrides[key]
    }
  }
}

function createBuilderMethod(builder, model) {
  return function (overrides = {}) {
    const builderInstance = builder.one(overrides)
    applyOverrides(builderInstance, overrides)
    return model.create(builderInstance)
  }
}

function createComponentBuilderMethod(builder) {
  return function (overrides = {}) {
    const builderInstance = builder.one(overrides)
    applyOverrides(builderInstance, overrides)
    return builderInstance
  }
}

class Builder {
  constructor() {
    this.faker = faker
    this.user = {
      student: createBuilderMethod(studentBuilder, UserModel),
      teacher: createBuilderMethod(teacherBuilder, UserModel),
    }
    this.question = createBuilderMethod(questionBuilder, QuestionModel)
    this.bank = createBuilderMethod(bankBuilder, BankModel)
    this.activity = Object.assign(
      createBuilderMethod(activityBuilder, ActivityModel),
      {
        section: createComponentBuilderMethod(sectionBuilder),
      },
    )
  }
  randomId() {
    return generateId()
  }
  token(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
  }
}

const builder = new Builder()

module.exports = builder
