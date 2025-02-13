const builder = require("../../../db-seed/builder.js")
const request = require('../setup.js')
const jwt = require('jsonwebtoken')
const generateId = require('../../../domains/utils/generateId.js')
const dotenv = require('dotenv').config()
const { faker } = builder

describe('Authentication route protection', () => {

    it('given unauthenticated request to protected route, returns 401', async () => {
        const res = await request.users.get(`/${generateId()}` )
        
        expect(res.status).toBe(401)
        
    })
})