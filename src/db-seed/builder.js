const { build, perBuild } = require("@jackfranklin/test-data-bot")
const { faker } = require("@faker-js/faker")
const generateId = require("../domains/utils/generateId")
const UserModel = require("../domains/users/data-access/model")
const QuestionModel = require("../domains/questions/data-access/model")
const BankModel = require("../domains/banks/data-access/model")
const ActivityModel = require("../domains/activities/data-access/model")
const ClassModel = require("../domains/classes/data-access/model")
const AssignmentModel = require("../domains/assignments/data-access/model")
const AssignmentResponseModel = require("../domains/responses/data-access/model")
const { QUESTION_TYPES, VARIABLE_TYPES, USER_ROLES } = require("../core/enums")
const dotenv = require("dotenv").config()
const jwt = require("jsonwebtoken")
const crypto = require("crypto")

faker.seed(123)

const assignmentResponseBuilder = build({
  name: "AssignmentResponse",
  fields: {
    _id: perBuild(() => generateId()),
    assignment: perBuild(() => generateId()),
    owner: perBuild(() => generateId()),
    variables: [],
    responses: [],
    totalScore: 0,
  },
})

const variableBuilder = build({
  name: "Variable",
  fields: {
    id: perBuild(() => generateId()),
    label: perBuild(() => faker.lorem.word()),
    type: VARIABLE_TYPES.Random,
    min: perBuild(() => faker.number.int({ min: 10, max: 100 })),
    max: perBuild(() => faker.number.int({ min: 101, max: 200 })),
    step: perBuild(() => faker.number.int({ min: 1, max: 5 })),
  },
})

const conditionBuilder = build({
  name: "Condition",
  fields: {
    id: perBuild(() => generateId()),
    expression: perBuild(() => faker.lorem.word()),
    isCorrect: true,
    feedback: perBuild(() => faker.lorem.sentence()),
  },
})

const assignmentBuilder = build({
  name: "Assignment",
  fields: {
    _id: perBuild(() => generateId()),
    class: perBuild(() => generateId()),
    activity: perBuild(() => generateId()),
    owner: perBuild(() => generateId()),
    startDate: perBuild(() => faker.date.soon()),
    dueDate: perBuild(() => faker.date.soon()),
  },
})

const classBuilder = build({
  name: "Class",
  fields: {
    _id: perBuild(() => generateId()),
    name: perBuild(() => faker.lorem.sentence()),
    owner: perBuild(() => generateId()),
    joinCode: perBuild(() => crypto.randomBytes(4).toString("hex")),
    roster: [],
    droppedStudents: [],
    isArchived: false,
  },
})

const rosteredStudentBuilder = build({
  name: "Rostered Student",
  fields: {
    student: perBuild(() => generateId()),
    joinDate: perBuild(() => new Date()),
  },
})

const droppedStudentBuilder = build({
  name: "Dropped Student",
  fields: {
    student: perBuild(() => generateId()),
    dropDate: perBuild(() => new Date()),
  },
})

const activityBuilder = build({
  name: "Activity",
  fields: {
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
    activity.sections.forEach((section) => {
      section.questions = section.questions.map((question) => {
        return {
          parent: question._id,
          id: generateId().toHexString(),
          prompt: question.prompt,
          variables: question.variables,
          conditions: question.conditions,
          pointValue: question.pointValue,
          type: question.type,
        }
      })
    })
    return activity
  },
})

const sectionBuilder = build({
  fields: {
    id: perBuild(() => generateId()),
    name: perBuild(() => faker.lorem.sentence(5)),
    questions: perBuild(() =>
      Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () =>
        questionBuilder(),
      ),
    ),
    summary: perBuild(() => faker.lorem.sentence(5)),
    sectionIndex: 0,
  },
})

const bankBuilder = build({
  name: "Bank",
  fields: {
    _id: perBuild(() => generateId()),
    name: perBuild(() => faker.lorem.sentence()),
    owner: perBuild(() => generateId()),
    description: perBuild(() => faker.lorem.sentence()),
    questions: [],
    isArchived: false,
    isDeleted: false,
  },
})

const studentBuilder = build({
  name: "User",
  fields: {
    _id: perBuild(() => generateId()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email().toLowerCase()),
    hash: "$2b$10$2Qt1dVjd.mH/t6h..Xv.JOkuFZ6Pn6kVUimXjDTZl84vYlF8JtNYW",
    role: USER_ROLES.Student,
  },
})

const teacherBuilder = build({
  name: "User",
  fields: {
    _id: perBuild(() => generateId()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email().toLowerCase()),
    hash: "$2b$10$2Qt1dVjd.mH/t6h..Xv.JOkuFZ6Pn6kVUimXjDTZl84vYlF8JtNYW",
    role: USER_ROLES.Teacher,
  },
})

const questionBuilder = build({
  name: "Question",
  fields: {
    _id: perBuild(() => generateId()),
    prompt: perBuild(() => faker.lorem.sentence(5)),
    variables: perBuild(() =>
      Array.from({ length: 5 }, () => variableBuilder()),
    ),
    conditions: perBuild(() =>
      Array.from({ length: 5 }, () => conditionBuilder()),
    ),
    pointValue: perBuild(() => faker.number.int({ min: 10, max: 100 })),
    type: QUESTION_TYPES.Numerical,
    owner: perBuild(() => generateId()),
    isArchived: false,
    isDeleted: false,
  },
})

function applyOverrides(builderInstance, overrides) {
  for (const key in overrides) {
    //eslint-disable-next-line
    if (overrides.hasOwnProperty(key)) {
      builderInstance[key] = overrides[key]
    }
  }
}

function createBuilderMethod(entityBuilder, model, builderClassInstance) {
  return function (overrides = {}) {
    const builderResult = entityBuilder.one(overrides)
    applyOverrides(builderResult, overrides)
    switch (model) {
      case UserModel:
        builderClassInstance.data.users.push(builderResult)
        break
      case QuestionModel:
        builderClassInstance.data.questions.push(builderResult)
        break
      case BankModel:
        builderClassInstance.data.banks.push(builderResult)
        break
      case ActivityModel:
        builderClassInstance.data.activities.push(builderResult)
        break
      case ClassModel:
        builderClassInstance.data.classes.push(builderResult)
        break
      case AssignmentModel:
        builderClassInstance.data.assignments.push(builderResult)
        break
      case AssignmentResponseModel:
        builderClassInstance.data.assignmentResponses.push(builderResult)
        break
      default:
        throw new Error(`${model} invalid model`)
    }
    return builderResult
  }
}

function createComponentBuilderMethod(entityBuilder) {
  return function (overrides = {}) {
    const builderResult = entityBuilder.one(overrides)
    applyOverrides(builderResult, overrides)
    return builderResult
  }
}

class Builder {
  constructor() {
    this.data = {
      users: [],
      questions: [],
      banks: [],
      activities: [],
      classes: [],
      assignments: [],
      assignmentResponses: [],
    }
    this.faker = faker
    this.user = {
      student: createBuilderMethod(studentBuilder, UserModel, this),
      teacher: createBuilderMethod(teacherBuilder, UserModel, this),
    }
    this.question = Object.assign(
      createBuilderMethod(questionBuilder, QuestionModel, this),
      {
        variable: createComponentBuilderMethod(variableBuilder),
        condition: createComponentBuilderMethod(conditionBuilder),
      },
    )
    this.bank = createBuilderMethod(bankBuilder, BankModel, this)
    this.activity = Object.assign(
      createBuilderMethod(activityBuilder, ActivityModel, this),
      {
        section: createComponentBuilderMethod(sectionBuilder),
      },
    )
    this.class = Object.assign(
      createBuilderMethod(classBuilder, ClassModel, this),
      {
        rosteredStudent: createComponentBuilderMethod(rosteredStudentBuilder),
        droppedStudent: createComponentBuilderMethod(droppedStudentBuilder),
      },
    )
    this.assignment = createBuilderMethod(
      assignmentBuilder,
      AssignmentModel,
      this,
    )
    this.assignmentResponse = createBuilderMethod(
      assignmentResponseBuilder,
      AssignmentResponseModel,
      this,
    )
  }
  randomId() {
    return generateId()
  }
  token(user) {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
  }
  async seed() {
    return {
      users: await UserModel.insertMany(this.data.users),
      questions: await QuestionModel.insertMany(this.data.questions),
      banks: await BankModel.insertMany(this.data.banks),
      activities: await ActivityModel.insertMany(this.data.activities),
      classes: await ClassModel.insertMany(this.data.classes),
      assignments: await AssignmentModel.insertMany(this.data.assignments),
      assignmentResponses: await AssignmentResponseModel.insertMany(
        this.data.assignmentResponses,
      ),
    }
  }
}

const builder = new Builder()

module.exports = builder
