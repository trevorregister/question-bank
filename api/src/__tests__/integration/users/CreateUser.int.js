const { USER_ROLES } = require("../../../core/enums.js")
const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const { faker } = builder
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv').config()

describe('Create User', () => {

    it('given valid inputs, returns new user and 201', async () => {
        const userProps = {
            email: faker.internet.email().toLowerCase(),
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: USER_ROLES.Student,
            password: faker.lorem.word(20)
        }
        const res = await request.users.post('/', userProps)
        const { token } = res.body
        const valid = jwt.verify(token, process.env.JWT_SECRET)
        const { id, role } = valid
        
        expect(res.status).toBe(201)
        expect(role).toBe(userProps.role)
        expect(id).toBeTruthy()
    })

    it('given invalid inputs, returns 422', async () => {
        const userProps = {
            email: 'fdas',
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: 'asdf',
            password: "asdf"
        }
        const res = await request.users.post('/', userProps)
        expect(res.status).toBe(422)
    })
})