import React from 'react'
import Meme from './Meme'
import axios from 'axios'
import { useState, useEffect } from 'react'

function MemeList(props) {

    const [memes, setMemes] = useState([])

    useEffect(() => {
        const fetchMemes = async () => {
        const res = await axios.get(`/memes`)
        console.log(res.data)
        setMemes(res.data)
        }
        fetchMemes()
    }, [])

    const memeList = memes
    const memesRendered = memeList.map((meme, index) => <Meme key={index} meme={meme} />)

    return (
        <div>
            {memesRendered}
        </div>
    )
}

export default MemeList