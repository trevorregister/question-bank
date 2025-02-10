const {
    CreateQuestionUseCase,
    CreateVariableUseCase,
    DeleteVariableUseCase
} = require('./use-cases/index')

module.exports = class QuestionController {
    constructor(repository){
        this.repository = repository
        this.create = this.create.bind(this)
        this.createVariable = this.createVariable.bind(this)
        this.deleteVariable = this.deleteVariable.bind(this)
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

    async createVariable(req, res, next){
        try{
            const createVariableCase = new CreateVariableUseCase(this.repository)
            const data = req.body
            const { questionId } = req.params
            data.questionId = questionId
            const result = await createVariableCase.execute(data)
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }

    async deleteVariable(req, res, next){
        try{
            const deleteVariableCase = new DeleteVariableUseCase(this.repository)
            const { questionId, variableId } = req.params
            const result = await deleteVariableCase.execute({questionId, variableId})
            res.status(201).send(result)
        } catch(err){
            next(err)
        }
    }
}