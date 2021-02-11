import React from 'react'
import Meme from './Meme'

function MemeList(props) {
    const memeList = props.memes
    const memesRendered = memeList.map((meme, index) => <Meme key={index} meme={meme} />)

    return (
        <div>
            {memesRendered}
        </div>
    )
}

export default MemeList