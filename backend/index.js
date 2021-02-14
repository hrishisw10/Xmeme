const express = require('express')
const mongoose = require('mongoose')
const memeRouter = require('./api/routes/memes')
const multer = require('multer')
const http = require('http')
const cors = require('cors')
const app = express()
//importing the body-parser module to parse data from the webpage body
const bodyParser = require('body-parser')
const Meme = require('./api/models/meme')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const upload=multer();

mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/meme-data", { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to mongodb')
})


const users = []
var count=1
app.use(cors())
app.use(express.json())

app.set('views','../frontend')
app.set('view engine', 'ejs')


app.post('/add',upload.none(),async (req,res)=>{
    try {
        console.log(req.body);
        var currData = new Meme({
            id:count,
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

app.listen(4000,()=>{
    console.log('Serving at 4000...')
})