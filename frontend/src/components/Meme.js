import React,{ Component } from 'react'
import './Meme.css'
import edit from './edit-icon.png'
import del from './delete-icon.png'
//import EditModal from './edit-modal';
import Modal from 'react-modal';
import axios from 'axios';


class Meme extends Component {
    constructor(props){
        super(props);
        //this.editMeme = this.editMeme.bind(this);
        this.state = {
            modalIsOpen: false,
            memeCaption:"",
            memeUrl:"",
        };
    }
    
    openModal = () =>{
        this.setState({modalIsOpen: true});
    };

    closeModal = () =>{
        this.setState({modalIsOpen: false});
        console.log(this.props.meme.id);
    };



    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }
    editHandler = e =>{
        //console.log('clicked edit button');
        const formData = new FormData();
        formData.append('memeOwner',this.props.meme.memeOwner);
        formData.append('memeCaption',this.state.memeCaption);
        formData.append('memeUrl',this.state.memeUrl);
        //console.log(this.state.memeOwner);
        axios({
            method: 'patch',
            url: 'http://localhost:4000/memes/'+this.props.meme.id+'/edit',
            data: formData,
            headers: {'Content-Type':'multipart/form-data'}
            })
            .then(function(res){
                //handle success
                console.log(res);
            })
            .catch(function(res){
                //handle error
                console.log(res);
            })
            this.setState({modalIsOpen: false});
            window.location.reload(true);
    }

    deleteHandler = e =>{
        axios.delete('http://localhost:4000/memes/'+this.props.meme.id+'/'+this.props.meme.memeOwner+'/delete')
        .then(function(res){
            //handle success
            console.log(res);
        })
        .catch(function(res){
            //handle error
            console.log(res);
        })
        this.setState({modalIsOpen: false});
        window.location.reload(true);
        /**axios({
            method:'delete',
            url: 'http://localhost:4000/memes/'+this.props.meme.id+'/'+this.props.meme.memeOwner+'/delete',
        })**/
    }

    render() {
        return(
        <div className='memeView'>
            <div>
                <span className="edit"><button className="edbutt" onClick={this.openModal}><img src={edit} className="edicon" alt="edit"></img></button></span>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal}>
                    <div>
                        <form>
                        <div>
                            <div>
                            <label for="memeOwner"><b>NAME</b>{this.props.meme.id} (cannot change)</label>
                            </div>
                            <input type="text" id="memeOwner" name="memeOwner" value={this.props.meme.memeOwner} onChange={this.changeHandler} disabled/>
                        </div>
                        <div>
                            <div>
                            <label for="memeCaption"><b>CAPTION</b></label>
                            </div>
                            <input type="text" id="memeCaption" name="memeCaption" placeholder={this.props.meme.memeCaption} onChange={this.changeHandler} required/>
                        </div>
                        <div>
                            <div>
                            <label for="memeUrl"><b>VALID URL</b></label>
                            </div>
                            <input type="text" id="memeUrl" name="memeUrl" placeholder={this.props.meme.memeUrl} onChange={this.changeHandler} required/>
                        </div>
                        <button type="submit" onClick={this.editHandler}>UPDATE</button>
                        <button onClick={this.deleteHandler}>DELETE</button>
                        <button onClick={this.closeModal}>CLOSE</button>
                        </form>

                    </div>
                </Modal>

            </div>
            <div><h2>{this.props.meme.memeOwner}</h2></div>
            <div><p>{this.props.meme.memeCaption}</p></div>
            <div><img className="memeImg" src={this.props.meme.memeUrl} alt="meme not found"></img></div>
        </div>
        )
    }
}


export default Meme