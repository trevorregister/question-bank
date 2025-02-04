const { setUp, dropCollections, dropDatabase} = require('../../config/test-db')

beforeAll(async () => {
    await setUp()
  })
  
  afterEach(async () => {
    await dropCollections()
  })
  
  afterAll(async () => {
    await dropDatabase()
  })