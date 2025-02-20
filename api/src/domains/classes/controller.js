const {
    CreateClassUseCase,
    JoinClassUseCase
} = require('./use-cases/index')
  
  module.exports = class ClassController {
    constructor(repository) {
        this.repository = repository
        this.create = this.create.bind(this)
        this.findById = this.findById.bind(this)
        this.joinClass = this.joinClass.bind(this)
    }

    async create(req, res, next) {
        try {
          const createClassCase = new CreateClassUseCase(this.repository)
          const data = { owner: req.user.id, ...req.body }
          const result = await createClassCase.execute(data)
          res.status(201).send(result)
        } catch (err) {
          next(err)
        }
      }

    async joinClass(req, res, next){
      try {
          const joinClassCase = new JoinClassUseCase(this.repository)
          const data = {userId: req.user.id, ...req.body}
          const result = await joinClassCase.execute(data)
          res.status(200).send(result)
      } catch(err){
        next(err)
      }
    }
  
    async findById(req, res, next) {
      try {
/*         const getUserByIdCase = new GetUserByIdUseCase(this.repository)
        const { userId } = req.params
        const user = await getUserByIdCase.execute(userId)
        res.status(200).send(user) */
      } catch (err) {
        next(err)
      }
    }
  }
  