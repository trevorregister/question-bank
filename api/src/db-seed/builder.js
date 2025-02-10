const { build, perBuild } = require('@jackfranklin/test-data-bot')
const { faker } = require('@faker-js/faker')
const generateId = require('../domains/utils/generateId')
const UserModel = require('../domains/users/data-access/model')
const UserRepository = require('../domains/users/repository')
const QuestionModel = require('../domains/questions/data-access/model')
const QuestionRepository = require('../domains/questions/repository')

const userModel = new UserModel()
const userRepository = new UserRepository(userModel)
const questionModel = new QuestionModel()
const questionRepository = new QuestionRepository(questionModel)

faker.seed(123)

const userFields = {
    _id: perBuild(() => generateId()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email()),
}

const questionFields = {
    _id: perBuild(() => generateId()),
    prompt: perBuild(() => faker.lorem.sentence(5)),
    variables: perBuild(() => []),
    conditions: perBuild(() => []),
    pointValue: perBuild(() => faker.number.int({min: 10, max: 100})),
    type: 'numerical',
    owner: perBuild(() => generateId())
}

const studentBuilder = build({
    name: 'User',
    fields: {
        role: 'student',
        ...userFields
    },
})

const teacherBuilder = build({
    name: 'User',
    fields: {
        role: 'teacher',
        ...userFields
    },
})

const questionBuilder = build({
    name: 'Question',
    fields: {
        ...questionFields
    }
})


function applyOverrides(builderInstance, overrides) {
    for (const key in overrides) {
        if (overrides.hasOwnProperty(key)) {
            builderInstance[key] = overrides[key];
        }
    }
}

function createBuilderMethod(builder, model){
    return function(overrides = {}) {
        const builderInstance = builder.one(overrides)
        applyOverrides(builderInstance, overrides)
        return model.create(builderInstance)
    }
}

class Builder {
    constructor(){
        this.userModel = userModel
        this.userRepository = userRepository
        this.questionModel = questionModel
        this.questionRepository = questionRepository
        this.faker = faker
        this.user = {
            student: createBuilderMethod(studentBuilder, userModel),
            teacher: createBuilderMethod(teacherBuilder, userModel)
        }
        this.question = createBuilderMethod(questionBuilder, questionModel)
    }
    randomId(){
        return generateId()
    }
/*     token(user){
        return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
    } */
}

const builder = new Builder()

module.exports = builder