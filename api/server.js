import app from "./app.js"
import connect from './config/db.js'

//connect('local')
app.listen(process.env.PORT, ()=>console.log(`Listening on port ${process.env.PORT}...`))


