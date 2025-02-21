const Joi = require("joi")
const Entity = require("../../core/entity.js")


const dbRosteredStudent = Joi.string().trim().required()

const dbDroppedStudent = Joi.string().trim().required()

const dbClass = Joi.object({
    name: Joi.string().trim().required(),
    owner: Joi.string().required(),
    joinCode: Joi.string().required().length(8)
})

class RosteredStudent extends Entity {
    static validator = dbRosteredStudent
    constructor(id){
        super()
        this.id = id
        this.joinDate = new Date()
    }

    static toWeb(data){
        return {
            student: data.student,
            joinDate: data.joinDate
        }
    }
}

class DroppedStudent extends Entity {
    static validator = dbDroppedStudent
    constructor(id){
        super()
        this.id = id
        this.dropDate = new Date()
    }
    static toWeb(data){
        return {
            student: data.student,
            dropDate: data.dropDate
        }
    }
}

class Class extends Entity {
  static validator = dbClass
  constructor({ name, owner, joinCode }) {
    super()
    this.name = name
    this.owner = owner
    this.roster = []
    this.droppedStudents = []
    this.joinCode = joinCode
  }

  static toWeb(data) {
    return {
      id: data._id,
      name: data.name,
      owner: data.owner,
      roster: data.roster,
      droppedStudents: data.droppedStudents,
      joinCode: data.joinCode
    }
  }
}

module.exports = {
    Class,
    RosteredStudent,
    DroppedStudent
}
