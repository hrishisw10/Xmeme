import React from 'react'
import './Meme.css'

function Meme(props) {
    return (
        <div className='memeView'>
            <div><p>{props.meme.memeOwner}</p></div>
            <div><h2>{props.meme.memeCaption}</h2></div>
            <div><img src={props.meme.memeUrl}></img></div>
        </div>
    )
}

export default Meme