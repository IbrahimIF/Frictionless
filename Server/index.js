const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const router =  require('./routes/router')
const mongoose = require('mongoose')
const seedDatabase = require('./seedDatabase');
const schema = require('./models/schemas');
require('dotenv/config')


const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))


const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use('/', router) /*this must be placed after all the body parsers and options */



const dbOptions = {useNewUrlParser:true, useUnifiedTopology:true}
mongoose.connect(process.env.DB_URI, {...dbOptions, dbName: 'frictionless_db' })
.then (() => console.log('DB Connected!'))
.catch(err => console.log(err))



const port = process.env.PORT /*taken from the .env file */
const server = app.listen(port, () => { 
    console.log(`Server is running on port ${port}`)
}) 


