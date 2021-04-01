const router = require('express').Router()
const { findOneAndUpdate } = require('../models/meme')
let Meme = require('../models/meme')
const multer = require('multer')
const upload=multer();
//let count = 1

router.get('/',(req,res,next)=>{
    Meme.find().limit(100)
        .then(memes => res.json(memes))
        .catch(err => {res.status(400).json('Error: ' + err)
            console.log(err)}
        )
})

router.post('/add',upload.none(), async (req,res)=>{
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
        
    } catch (error) {
        console.log(error);
    }

 })



router.patch('/:id/edit',upload.none(),async (req,res)=>{
    try{
        console.log(req.body)
        var newData ={
            memeCaption: req.body.memeCaption,
            memeUrl: req.body.memeUrl,
            updated_at: Date.now().toString()
        };
        //var capt=req.body.memeCaption
        console.log(req.body.memeOwner)
        await Meme.updateOne({'id':req.params.id,'memeOwner':req.body.memeOwner},newData)
        .then( log => res.json(log))
        
    } catch(error){
        console.log(error);
    }
})



router.delete('/:id/:memeOwner/delete',(req,res)=>{
    console.log(req.params.id,req.params.memeOwner)
    Meme.deleteOne({'id':req.params.id,'memeOwner':req.params.memeOwner})
    .then(log => res.json(log))
})



module.exports= router