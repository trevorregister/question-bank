const { MongoMemoryServer } = require('mongodb-memory-server')
const mongoose = require('mongoose')

let mongo = undefined

async function setUp(){
    mongo = await MongoMemoryServer.create()
    const url = mongo.getUri()

    await mongoose.connect(url)
}

async function dropDatabase(){
    if (mongo) {
        await mongoose.connection.dropDatabase()
        await mongoose.connection.close()
        await mongo.stop()
    }
}

async function dropCollections(){
    if (mongo) {
        const collections = mongoose.connection.collections

        for (const key in collections) {
            const collection = collections[key]
            await collection.deleteMany()
        }
    }
}

module.exports = {
    setUp,
    dropDatabase,
    dropCollections
}