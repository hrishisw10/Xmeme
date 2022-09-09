const express = require('express')
const mongoose = require('mongoose')
const memeRouter = require('./api/routes/memes')
const multer = require('multer')
const http = require('http')
const cors = require('cors')
const app = express()
const dotenv = require('dotenv')
dotenv.config()
const port = process.env.PORT
const dburl = process.env.DB_URL_CLOUD || "mongodb://127.0.0.1:27017"

//importing the body-parser module to parse data from the webpage body
const bodyParser = require('body-parser')
const Meme = require('./api/models/meme')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const upload=multer();
mongoose.Promise = global.Promise
mongoose.connect(dburl, { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to mongodb')
})

const users = []

app.use(cors())
app.use(express.json())

app.set('views','./')
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.use('/memes', memeRouter)

app.listen(port,()=>{
    console.log('Serving at '+port)
})