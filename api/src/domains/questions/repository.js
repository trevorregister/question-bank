const Repository = require('../../core/repository')
const mongoose = require('mongoose')

module.exports = class QuestionRepository extends Repository{
    constructor(model){
        super(model)
        this.addVariableToQuestion = this.addVariableToQuestion.bind(this)
        this.deleteVariableFromQuestion = this.deleteVariableFromQuestion.bind(this)
        this.addConditionToQuestion = this.addConditionToQuestion.bind(this)
        this.deleteConditionFromQuestion = this.deleteConditionFromQuestion.bind(this)
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
            { $pull: {variables: {id: mongoose.Types.ObjectId.createFromHexString(variableId)}} },
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

    async deleteConditionFromQuestion({questionId, conditionId}){
        return await this.model.findOneAndUpdate(
            { _id: questionId },
            { $pull: {conditions: {id: mongoose.Types.ObjectId.createFromHexString(conditionId)}} },
            { new: true }
        )
    }
}