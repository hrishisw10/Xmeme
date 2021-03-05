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
//importing the body-parser module to parse data from the webpage body
const bodyParser = require('body-parser')
const Meme = require('./api/models/meme')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const upload=multer();

mongoose.Promise = global.Promise
mongoose.connect('mongodb+srv://hrishisw10:qwertyuiop@cluster0.nji9n.mongodb.net/meme-data?retryWrites=true&w=majority', { useNewUrlParser: true,useCreateIndex:true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to mongodb')
})


const users = []
var count=1
app.use(cors())
app.use(express.json())

app.set('views','./')
app.set('view engine', 'ejs')

app.get('/',(req,res)=>{
    res.render('home.ejs')
})

app.post('/add',upload.none(),async (req,res)=>{
    try {
        console.log(req.body);
        var currData = new Meme({
            id:Date.now(),
            memeOwner: req.body.memeOwner,
            memeCaption: req.body.memeCaption,
            memeUrl: req.body.memeUrl,
            created_at: Date.now().toString()
        });
        await currData.save()
        res.send({message:"Sucessfully Saved"})
        count+=1;
        
    } catch (error) {
        console.log(error);
    }

 })

app.use('/memes', memeRouter)

app.listen(port,()=>{
    console.log('Serving at '+port)
})