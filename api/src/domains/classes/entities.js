const Joi = require("joi")
const Entity = require("../../core/entity.js")


const dbRosteredStudent = Joi.object({
    student: Joi.string().trim().required(),
    joinDate: Joi.date().required()
})

const dbDroppedStudent = Joi.object({
    student: Joi.string().trim().required(),
    dropDate: Joi.date().required()
})

const dbClass = Joi.object({
    name: Joi.string().trim().required(),
    owner: Joi.string().required(),
})

class RosteredStudent extends Entity {
    static validator = dbRosteredStudent
    constructor(student){
        this.student = student
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
    constructor(student){
        this.student = student
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
  constructor({ name, owner }) {
    super()
    this.name = name
    this.owner = owner
    this.roster = []
    this.droppedStudents = []
  }

  static toWeb(data) {
    return {
      id: data._id,
      name: data.name,
      owner: data.owner,
      roster: data.roster,
      droppedStudents: data.droppedStudents
    }
  }
}

module.exports = {
    Class,
    RosteredStudent,
    DroppedStudent
}
