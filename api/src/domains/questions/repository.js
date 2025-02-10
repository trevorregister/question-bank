const Repository = require('../../core/repository')

module.exports = class QuestionRepository extends Repository{
    constructor(model){
        super(model)
        this.addVariableToQuestion = this.addVariableToQuestion.bind(this)
    }

    async addVariableToQuestion({questionId, variable}) {
        return await this.model.findOneAndUpdate(
            {_id: questionId},
            {$push: {variables: variable}},
            {new: true}
        )
    }
}