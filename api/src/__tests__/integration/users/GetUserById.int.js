const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const { faker } = builder



describe('getUserById', () => {

    it('returns user and 200', async () => {
        const user = await builder.user.teacher()
        //const token = builder.token(user)
        const res = await request.users.get(`/${user.id}`/* , token */)
        expect(res.status).toBe(200)

    })
})