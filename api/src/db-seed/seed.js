/* import builder from '../db-seed/builder.js'
import connect from '../../config/db.js'
import UserModel from '../domains/users/data-access/model.js'
import "dotenv/config" */

const builder = require('../db-seed/builder')
const connect = require('../../config/db')
const UserModel = require('../domains/users/data-access/model')
const dotenv = require('dotenv').config()

const userModel = new UserModel()

async function init(){
    await connect('local')
    await userModel.deleteMany({})
}

async function buildUsers(){
    for(let i=0; i<10; i++){
        const teacher = await builder.user.teacher()
        userModel.create(teacher)
        }
    }

async function seed(){
    await init()
    await buildUsers()
}

seed()