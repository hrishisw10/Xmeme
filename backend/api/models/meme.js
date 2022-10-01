const mongoose = require('mongoose')
const Schema = mongoose.Schema

const memeSchema = new Schema({
    id: Number,
    memeOwner: {
        type: String,
        required: true,
        trim: true
    },
    memeCaption: {
        type: String,
        required: true,
        trim: true
    },
    memeUrl: {
        type: String,
        required: true,
        trim: true
    },
    memeComments:{
        type: Array,
        trim: true
    },
    created_at: String,
    updated_at: String
})

const Meme = mongoose.model('Meme', memeSchema)
module.exports = Meme