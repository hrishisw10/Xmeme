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
        formData= new FormData()
        formData.append('memeOwner', this.state.memeOwner)
        formData.append('memeCaption', this.state.memeCaption)
        formData.append('memeUrl', this.state.memeUrl)
        console.log(formData)
        axios({
            method: 'post',
            url: 'http://localhost:4000/add',
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
    }

    render() {
        const {memeOwner, memeCaption, memeUrl} = this.state
        return (
            <div>
                <form action="http://localhost:4000/add" onSubmit={this.submitHandler}>
                <div>
                    <label for="memeOwner">memeOwner.... :</label>
                    <input type="text" id="memeOwner" name="memeOwner" value={memeOwner} onChange={this.changeHandler} required/>
                </div>
                <div>
                    <label for="memeCaption">memeCaption.. :</label>
                    <input type="text" id="memeCaption" name="memeCaption" value={memeCaption} onChange={this.changeHandler} required/>
                </div>
                <div>
                    <label for="memeUrl">memeUrl......... :</label>
                    <input type="text" id="memeUrl" name="memeUrl" value={memeUrl} onChange={this.changeHandler} required/>
                </div>
                <button type="submit" >Submit</button>
                </form>

            </div>
        )
    }
}

export default MemeForm