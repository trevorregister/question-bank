const {
    CreateQuestionUseCase,
} = require('./use-cases/index')

module.exports = class QuestionController {
    constructor(repository){
        this.repository = repository
        this.create = this.create.bind(this)
    }

    async create(req, res, next){
        try{
            const createQuestionCase = new CreateQuestionUseCase(this.repository)
            const data = req.body
            const result = await createQuestionCase.execute(data)
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }
}