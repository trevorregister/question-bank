const { USER_ROLES } = require("../../../core/enums.js")
const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const { faker } = builder


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
        expect(res.status).toBe(201)
        const { email, firstName, lastName, role } = res.body
        expect({
            email,
            firstName,
            lastName, 
            role
        }).toEqual({
            email: userProps.email,
            firstName: userProps.firstName,
            lastName: userProps.lastName,
            role: userProps.role
        })
    })

    it('given invalid inputs, returns 422', async () => {
        const userProps = {
            email: 'fdas',
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            role: 'asdf'
        }
        const res = await request.users.post('/', userProps)
        expect(res.status).toBe(422)
    })
})