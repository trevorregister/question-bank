const supertest = require("supertest")
const app = require("../../../app")

const supertestRequest = supertest(app)

const routes = {
  users: "/api/users",
  questions: "/api/questions",
  banks: "/api/banks",
  activities: "/api/activities",
  classes: "/api/classes",
  assignments: "/api/assignments",
  activityresponses: "/api/responses",
  seed: "/api/test/seed",
}

function createRequestMethods(request, domainRoute) {
  return {
    post: (endpoint, data, token = "", headers = {}) =>
      request
        .post(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}`, ...headers })
        .send(data),
    get: (endpoint, token = "", headers = {}) =>
      request
        .get(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}`, ...headers }),
    patch: (endpoint, data, token = "", headers = {}) =>
      request
        .patch(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}`, ...headers })
        .send(data),
    delete: (endpoint, token = "", headers = {}) =>
      request
        .delete(`${domainRoute}${endpoint}`)
        .set({ Cookie: `token=${token}`, ...headers }),
  }
}

class Request {
  constructor(request, routes) {
    this.users = createRequestMethods(request, routes.users)
    this.questions = createRequestMethods(request, routes.questions)
    this.banks = createRequestMethods(request, routes.banks)
    this.activities = createRequestMethods(request, routes.activities)
    this.classes = createRequestMethods(request, routes.classes)
    this.assignments = createRequestMethods(request, routes.assignments)
    this.activityresponses = createRequestMethods(
      request,
      routes.activityresponses,
    )
    this.seed = createRequestMethods(request, routes.seed)
  }
}

const request = new Request(supertestRequest, routes)

module.exports = request
