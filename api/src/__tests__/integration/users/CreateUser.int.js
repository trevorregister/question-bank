const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')


describe('Create User', () => {

    it('given valid inputs, returns new user and 201', async () => {
        const userProps = {
            email: builder.faker.internet.email().toLowerCase(),
            firstName: builder.faker.person.firstName(),
            lastName: builder.faker.person.lastName(),
            role: 'student'
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
            role: 'student'
        })
    })

    it('given invalid inputs, returns 422', async () => {
        const userProps = {
            email: 'fdas',
            firstName: builder.faker.person.firstName(),
            lastName: builder.faker.person.lastName(),
            role: 'asdf'
        }
        const res = await request.users.post('/', userProps)
        expect(res.status).toBe(422)
    })
})