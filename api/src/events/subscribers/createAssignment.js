const EventBus = require("../EventBus")
const EVENTS  = require('../types')
const AssignmentResponseModel = require('../../domains/responses/data-access/model.js')
const AssignmentResponseRepository = require('../../domains/responses/repository.js')
const { CreateAssignmentResponseUseCase }= require('../../domains/responses/use-cases/index')
const toOid = require('../../domains/utils/toOid.js')

async function handleCreateAssignment({ id, studentIds }) {
    const repo = new AssignmentResponseRepository(AssignmentResponseModel)
    const createResponseCase = new CreateAssignmentResponseUseCase(repo)
    studentIds.forEach(async (studentId) => {
        const responseLookup = await repo.findOne({assignment: toOid(id), owner: toOid(studentId)})
        if(responseLookup){
            return
        }
        await createResponseCase.execute({ assignmentId: id, owner: studentId })
    })
}

module.exports = EventBus.subscribe(EVENTS.CreateAssignment, async (payload) => { await handleCreateAssignment(payload) })