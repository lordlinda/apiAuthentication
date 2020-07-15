//importing third  party  models
const express = require('express')
const  bodyParser = require('body-parser')
const cors = require('cors')

const morgan = require('morgan')
const mongoose = require('mongoose')

//connect to mongodb
mongoose.connect('mongodb://localhost/apiauth'|| 'mongodb+srv://lord:phaneroo@5@cluster0.s76t6.mongodb.net/pnote?retryWrites=true&w=majority')
//intsance  of connection
const db = mongoose.connection

//check for  connection
db.once('open',()=> console.log('connected to mongodb successfully'))


//Init  App
const app = express();
//as soon as you initalise
app.use(cors())


//Middleware
//for middleware we  always use  app.use
app.use(bodyParser.json())
app.use(morgan('dev'))
//serve static files
app.use(express.static('client/build'))

//Routes
app.use('/users',require('./api/routes.js'))



    //port  listening to server
const port =  process.env.PORT || 5000

app.listen(port,()=> console.log(`server is listening on ${port}`))




