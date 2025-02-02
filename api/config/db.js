import mongoose from 'mongoose'

export default async function connect(environment){
    switch (environment){
        case 'local':
            var uri = process.env.MONGO_LOCAL_URI
            break
        case 'production':
            var uri = process.env.MONGO_PRODUCTION_URI
            break
    }

    var connection = await mongoose.connect(uri)
    console.log(`Connected to ${connection.connections[0].name}`)
} 