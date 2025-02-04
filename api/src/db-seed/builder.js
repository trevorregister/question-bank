import { build, perBuild } from '@jackfranklin/test-data-bot'
import { faker } from '@faker-js/faker'
import generateId from '../domains/utils/generateId.js'
import UserModel from '../domains/users/data-access/model.js'

import UserRepository from '../domains/users/repository.js'

const userModel = new UserModel()
const userRepository = new UserRepository(userModel)

faker.seed(123)

const userFields = {
    _id: perBuild(() => generateId()),
    firstName: perBuild(() => faker.person.firstName()),
    lastName: perBuild(() => faker.person.lastName()),
    email: perBuild(() => faker.internet.email()),
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
        this.faker = faker
        this.user = {
            student: createBuilderMethod(studentBuilder, userModel),
            teacher: createBuilderMethod(teacherBuilder, userModel)
        }
    }
    randomId(){
        return generateId()
    }
/*     token(user){
        return jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET)
    } */
}

const builder = new Builder()

export default builder