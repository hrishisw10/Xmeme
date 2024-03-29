import React,{ Component } from 'react'
import axios from 'axios'

class MemeForm extends Component{
    constructor(props){
        super(props)
        
        this.state = {
            memeOwner: '',
            memeCaption: '',
            memeUrl: '',

        }
    }

    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e =>{

        e.preventDefault()
        const formData= new FormData()
        formData.append('memeOwner', this.state.memeOwner)
        formData.append('memeCaption', this.state.memeCaption)
        formData.append('memeUrl', this.state.memeUrl)
        console.log(formData)
        axios({
            method: 'post',
            url: 'http://localhost:4000/memes/add',
            data: formData,
            headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            })
            window.location.reload(true)
    }

    render() {
        const {memeOwner, memeCaption, memeUrl} = this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                <div>
                    <div>
                    <label htmlFor="memeOwner">User's Name </label>
                    </div>
                    <input type="text" id="outer" name="memeOwner" value={memeOwner} onChange={this.changeHandler} required/>
                </div>
                <div>
                    <div>
                    <label htmlFor="memeCaption">Meme Caption</label>
                    </div>
                    <input type="text" id="outer" name="memeCaption" value={memeCaption} onChange={this.changeHandler} required/>
                </div>
                <div>
                    <div>
                    <label htmlFor="memeUrl">Valid Url</label>
                    </div>
                    <input type="text" id="outer" name="memeUrl" value={memeUrl} onChange={this.changeHandler} required/>
                </div>
                <button type="submit" >Post Meme</button>
                </form>

            </div>
        )
    }
}

export default MemeForm