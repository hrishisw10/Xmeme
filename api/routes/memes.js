const router = require('express').Router()

router.get('/',(req,res,next)=>{
    return res.status(200).json({
        'message': 'Viewing all memes'
    })
})

router.post('/',(req,res,next)=>{
    return res.status(201).json({
        'memeOwner':req.body.memeOwner,
        'memeCaption': req.body.memeCaption,
        'memeUrl': req.body.memeUrl,
        'message': 'Meme Created'
    })
})

module.exports= router