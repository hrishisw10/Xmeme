import React from 'react'
import './Meme.css'
import edit from './edit-icon.png'
import del from './delete-icon.png'
function Meme(props) {
    function editMeme(e){
        e.preventDefault();
        console.log('abc');
    
    }
    return (
        <div className='memeView'>
            <div>
                <span className="edit"><button className="edbutt" onclick={editMeme}><img src={edit} className="edicon" alt="edit"></img></button></span>
                <span className="delete"><button className="edbutt"><img src={del} className="edicon"></img></button></span>
            </div>
            <div><h2>{props.meme.memeOwner}</h2> </div>
            <div><p>{props.meme.memeCaption}</p></div>
            <div><img className="memeImg" src={props.meme.memeUrl} alt="meme not found"></img></div>
        </div>
    )
}


export default Meme