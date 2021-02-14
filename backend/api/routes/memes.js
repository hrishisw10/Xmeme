const router = require('express').Router()
let Meme = require('../models/meme')

//let count = 1

router.get('/',(req,res,next)=>{
    // return res.status(200).json({
    //     'message': 'Viewing all memes'
    // })
    Meme.find().sort({created_at: -1}).limit(100)
        .then(memes => res.json(memes))
        .catch(err => {res.status(400).json('Error: ' + err)
            console.log(err)}
        )
})

router.post('/add',(req,res,next)=>{
    // return res.status(201).json({
    //     'memeOwner':req.body.memeOwner,
    //     'memeCaption': req.body.memeCaption,
    //     'memeUrl': req.body.memeUrl,
    //     'message': 'Meme Created'
    // })
    var newMeme = new Meme({
        id: Date.now(),
        memeOwner: req.body.memeOwner,
        memeCaption: req.body.memeCaption,
        memeUrl: req.body.memeUrl,
        created_at: Date.now().toString()
    })
    newMeme.save()
        .then(() => res.json('Meme added'))
        .catch(err => res.status(400).json('Error: ' + err))

//    count += 1;
})

module.exports= router