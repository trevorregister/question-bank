const Repository = require('../../core/repository')

module.exports = class QuestionRepository extends Repository{
    constructor(model){
        super(model)
        this.addVariableToQuestion = this.addVariableToQuestion.bind(this)
        this.deleteVariableFromQuestion = this.deleteVariableFromQuestion.bind(this)
        this.addConditionToQuestion = this.addConditionToQuestion.bind(this)
    }

    async addVariableToQuestion({questionId, variable}) {
        return await this.model.findOneAndUpdate(
            { _id: questionId },
            {$push: {variables: variable} },
            { new: true }
        )
    }

    async deleteVariableFromQuestion({questionId, variableId}){
        return await this.model.findOneAndUpdate(
            { _id: questionId },
            { $pull: {variables: {_id: variableId}} },
            { new: true }
        )
    }

    async addConditionToQuestion({questionId, condition}) {
        return await this.model.findOneAndUpdate(
            { _id: questionId },
            {$push: {conditions: condition} },
            { new: true }
        )
    }
}