const express = require('express')
const mongoose = require('mongoose')
const memeRouter = require('./api/routes/memes')
//const cors = require('cors')
const app = express()
//importing the body-parser module to parse data from the webpage body
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))



mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost:27017/meme-data", { useNewUrlParser: true, useUnifiedTopology: true })
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Connected to mongodb')
})
// var mySchema = new mongoose.Schema({
//     id: Number,
//     memeOwner: String,
//     memeCaption: String,
//     memeUrl: String,
//     created_at: String,
//     updated_at:String
//    });
// var User = mongoose.model('User',mySchema);


const users = []
var count=1
//app.use(cors())
app.use(express.json())

app.set('views','../frontend')
//app.engine('html', require('ejs').renderFile)
app.set('view engine', 'ejs')

// app.get('/', (req,res) =>{

//     User.find({}, (err,docs)=>{
//         if(err) res.json(err);
//         else res.render('index',{users:docs})
//     })

//     //res.render('index.html')
// })

// app.post('/add',(req,res)=>{
//     var currData = new User({
//         id:count,
//         memeOwner: req.body.memeOwner,
//         memeCaption: req.body.memeCaption,
//         memeUrl: req.body.memeUrl,
//         created_at: Date.now().toString()
//     });
//     //currData=
//     currData.save()
//     .then(item => {
//         User.find({}, (err,docs)=>{
//             if(err) res.json(err);
//             else res.render('index',{users:docs})
//         })
//         })
//         .catch(err => {
//         res.status(400).send("unable to save to database");
//         })
//     /*
//     users.push({
//         id:count,
//         'memeOwner': req.body.memeOwner,
//         'memeCaption': req.body.memeCaption,
//         'memeUrl': req.body.memeUrl
//     })
//     res.redirect('/')
//     console.log(users)
//     */
//     count+=1
// })

app.use('/memes', memeRouter)

app.listen(3000,()=>{
    console.log('Serving at 3000...')
})