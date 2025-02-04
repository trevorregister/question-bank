const app = require('./app.js')
const connect = require('./config/db.js')

connect('local')
app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))


