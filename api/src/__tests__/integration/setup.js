const supertest = require("supertest")
const app = require("../../../app")

const supertestRequest = supertest(app)

const routes = {
  users: "/api/users",
  questions: "/api/questions",
  banks: "/api/banks",
  activities: "/api/activities",
  classes: "/api/classes"
}

function createRequestMethods(request, domainRoute) {
  return {
    post: (endpoint, data, token = "") =>
      request
        .post(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}` })
        .send(data),
    get: (endpoint, token = "") =>
      request
        .get(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}` }),
    patch: (endpoint, data, token = "") =>
      request
        .patch(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}` })
        .send(data),
    delete: (endpoint, token = "") =>
      request
        .delete(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}` }),
  }
}

class Request {
  constructor(request, routes) {
    this.users = createRequestMethods(request, routes.users)
    this.questions = createRequestMethods(request, routes.questions)
    this.banks = createRequestMethods(request, routes.banks)
    this.activities = createRequestMethods(request, routes.activities)
    this.classes = createRequestMethods(request, routes.classes)
  }
}

const request = new Request(supertestRequest, routes)

module.exports = request
