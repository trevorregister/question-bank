const Repository = require('../../core/repository')
const toOid = require('../utils/toOid')

module.exports = class QuestionRepository extends Repository{
    constructor(model){
        super(model)
        this.addVariableToQuestion = this.addVariableToQuestion.bind(this)
        this.deleteVariableFromQuestion = this.deleteVariableFromQuestion.bind(this)
        this.addConditionToQuestion = this.addConditionToQuestion.bind(this)
        this.deleteConditionFromQuestion = this.deleteConditionFromQuestion.bind(this)
        this.updateQuestion = this.updateQuestion.bind(this)
        this.findQuestionsByOwner = this.findQuestionsByOwner.bind(this)
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
            { $pull: {variables: {id: toOid(variableId)}} },
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
            { $pull: {conditions: {id: toOid(conditionId)}} },
            { new: true }
        )
    }

    async updateQuestion({questionId, payload}){
/*         let setParameters = {}
        if(payload.variables){
            for (const [key, value] of Object.entries(payload.variables)){
                setParameters[`variables.$[elem].${key}`] = value
            }
        } */
       const question = await this.model.findById(questionId)
       Object.entries(payload).forEach(([key, value]) => {
        switch(key){
            case 'variables':
                payload.variables.forEach(payloadVariable => {
                    question.variables.forEach(questionVariable => {
                        if(questionVariable.id.toHexString() === payloadVariable.id){
                            Object.entries(payloadVariable).forEach(([key, value]) => {
                                questionVariable[key] = value
                            })
                        } 
                    })
                })
                break
            default:
                question[key] = value
        }
       })
       return await question.save()
/*         return await this.model.findOneAndUpdate(
            { _id: questionId },
            { $set: setParameters },
            { new: true }
        ) */
    }

    async findQuestionsByOwner(ownerId){
        return await this.model.find({owner: toOid(ownerId)})
    }
}