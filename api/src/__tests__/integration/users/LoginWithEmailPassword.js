const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const { faker } = builder



describe('Login with email and password', () => {

    it('given correct credentials, returns user and 200', async () => {
        const user = await builder.user.teacher()
        const res = await request.users.post(`/login/email-password`, {email: user.email, password: 'asdf'})
        const {firstName, lastName, email, role} = res.body

        expect(res.status).toBe(200)
        expect({
            firstName,
            lastName,
            email,
            role
        }).toEqual({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email.toLowerCase(),
            role: user.role
        })
    })

    it('given correct email but wrong password, returns 401', async () => {
        const user = await builder.user.teacher()
        const res = await request.users.post(`/login/email-password`, {email: user.email, password: 'incorrect password'})
        expect(res.status).toBe(401)
    })
})