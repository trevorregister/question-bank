/* import builder from '../db-seed/builder.js'
import connect from '../../config/db.js'
import UserModel from '../domains/users/data-access/model.js'
import "dotenv/config" */

const builder = require('../db-seed/builder')
const connect = require('../../config/db')
const UserModel = require('../domains/users/data-access/model')
const QuestionModel = require('../domains/questions/data-access/model')
const dotenv = require('dotenv').config()

const userModel = new UserModel()
const questionModel = new QuestionModel()

async function init(){
    await connect('local')
    await userModel.deleteMany({})
    await questionModel.deleteMany({})
}

async function buildUsers(){
    const teachers = []
    for(let i=0; i<10; i++){
        const teacher = await builder.user.teacher()
        teachers.push(teacher)
        userModel.create(teacher)
        }
    return {
        teachers: teachers
    }
    }

async function buildQuestions(teachers){
    teachers.forEach(async teacher => {
        for(let i=0; i<10; i++){
            const question = await builder.question({owner: teacher._id})
            questionModel.create(question)
        }
    })
}

async function seed(){
    await init()
    const users = await buildUsers()
    await buildQuestions(users.teachers)
}

seed()