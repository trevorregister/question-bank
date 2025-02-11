const supertest = require('supertest')
const app = require('../../../app')

const supertestRequest = supertest(app)

const routes = {
    users: '/api/users',
    questions: '/api/questions'
}

function createRequestMethods(request, domainRoute){
    return {
        post: (endpoint, data, token = '') => 
            request
                .post(`${domainRoute}${endpoint}`)
                //.set({'Cookie': `authcookie=${token}`})
                .send(data),
        get: (endpoint, token = '') => 
            request
                .get(`${domainRoute}${endpoint}`)
                //.set({'Cookie': `authcookie=${token}`})
        ,
        patch: (endpoint, data, token = '') => 
            request
                .patch(`${domainRoute}${endpoint}`)
                //.set({'Cookie': `authcookie=${token}`})
                .send(data)
        ,
        delete: (endpoint, token = '') => 
            request
                .delete(`${domainRoute}${endpoint}`)
                //.set({'Cookie': `authcookie=${token}`})
        
    }
}

class Request {
    constructor(request, routes){
        this.users = createRequestMethods(request, routes.users)
        this.questions = createRequestMethods(request, routes.questions)
    }
}

const request = new Request(supertestRequest, routes)

module.exports = request