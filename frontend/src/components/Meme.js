import React from 'react'
import './Meme.css'

function Meme(props) {
    return (
        <div className='memeView'>
            <div><h2>{props.meme.memeOwner}</h2></div>
            <div><p>{props.meme.memeCaption}</p></div>
            <div><img src={props.meme.memeUrl} alt="meme not found"></img></div>
        </div>
    )
}

export default Meme