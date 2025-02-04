import builder from '../../../db-seed/builder.js'
import request from '../setup.js'


describe('getUserById', () => {

    it('returns user and 200', async () => {
        const user = builder.user.teacher()
        //const token = builder.token(user)
        const res = await request.users.get(`/${user.id}`/* , token */)
        expect(res.status).toBe(200)

    })
})