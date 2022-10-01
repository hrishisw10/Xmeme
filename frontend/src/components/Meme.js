import React,{ Component } from 'react'
import './Meme.css'
import edit from './edit-icon.png'
import like from './like.gif'
import comments from './comments.gif'
import send from './send.gif'
//import EditModal from './edit-modal';
import Modal from 'react-modal';
import axios from 'axios';

class Meme extends Component {
    constructor(props){
        super(props);
        //this.editMeme = this.editMeme.bind(this);
        this.state = {
            modalIsOpen: false,
            commentsModalIsOpen: false,
            memeCaption:props.meme.memeCaption,
            memeUrl:this.props.meme.memeUrl,
            likesCount:parseInt(Math.random()*10*Math.random()*100)
        };
    }
    
    openModal = () =>{
        this.setState({modalIsOpen: true});
    };

    openCommentsModal = () =>{
        this.setState({commentsModalIsOpen: true});
    };

    closeModal = () =>{
        this.setState({modalIsOpen: false, commentsModalIsOpen:false});
        console.log(this.props.meme.id);
    };

    changeHandler = e =>{
        this.setState({[e.target.name]: e.target.value})
    }

    editHandler = e =>{
        const formData = new FormData();
        formData.append('memeOwner',this.props.meme.memeOwner);
        formData.append('memeCaption',this.state.memeCaption);
        formData.append('memeUrl',this.state.memeUrl);
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

    likeHandler = () =>{
        this.setState((state)=>{
            return {likesCount : state.likesCount+1}
        });
    }

    render() {
        return(
        <div className='memeView'>
            <span className="edit"><button className="edbutt" onClick={this.openModal}><img src={edit} className="edicon" alt="edit"></img></button></span>
                <div id="neon">.</div><div id="tomato">.</div>
            <div>
                <Modal isOpen={this.state.modalIsOpen} onRequestClose={this.closeModal} id="modal">
                    <div>
                        <form>
                            <div>
                                <div>
                                    <label htmlFor="memeOwner"><b>User's Name</b>(cannot change)</label>
                                </div>
                                <input type="text" id="inner" name="memeOwner" value={this.props.meme.memeOwner} onChange={this.changeHandler} disabled/>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="memeCaption"><b>Meme Caption</b></label>
                                </div>
                                <input type="text" id="inner" name="memeCaption" value={this.state.memeCaption} onChange={this.changeHandler} required/>
                            </div>
                            <div>
                                <div>
                                    <label htmlFor="memeUrl"><b>Valid Url</b></label>
                                </div>
                                <input type="text" id="inner" name="memeUrl" value={this.state.memeUrl} onChange={this.changeHandler} required/>
                            </div>
                            <button type="submit" onClick={this.editHandler}>UPDATE</button>
                            <button onClick={this.deleteHandler}>DELETE</button>
                            <button onClick={this.closeModal}>CLOSE</button>
                        </form>
                    </div>
                </Modal>
            </div>
            <div><h2>{this.props.meme.memeOwner}</h2></div>
            <div><h4>{this.props.meme.memeCaption}</h4></div>
            <div><img className="memeImg" src={this.props.meme.memeUrl} alt="meme not found"></img></div>
            <div style={{textAlign:"center",backgroundColor:"white",size:"auto"}}>
                <button className="edbutt" onClick={this.likeHandler}><img src={like} className="edicon" alt="Like"/></button>
                <span>{this.state.likesCount}</span>
                <button className="edbutt" onClick={this.openCommentsModal}><img src={comments} className="edicon" alt="Comments"/></button>
                <span>{this.props.meme.memeComments.length}</span>
            </div>
            <div>
                <Modal isOpen={this.state.commentsModalIsOpen} onRequestClose={this.closeModal} id="modal">
                    <Comments meme={this.props.meme}/>
                </Modal>
                
            </div>
        </div>
        )
    }
}



class Comments extends Component{
    constructor(props){
        super(props);
        this.state={
            newComment:""
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.editHandler = this.editHandled.bind(this);
    }  
    changeHandler = (e) =>{
        this.setState({
            newComment:e.target.value
        })
        //console.log(e.target.value)
    }
    editHandled=(e)=>{
        if(this.state.newComment.trim().length)
            this.props.meme.memeComments.push(this.state.newComment);
        this.setState({newComment:""})

        const formData = new FormData();
        formData.append('memeOwner',this.props.meme.memeOwner);
        formData.append('memeComments',this.props.meme.memeComments);
        axios({
            method: 'patch',
            url: 'http://localhost:4000/memes/'+this.props.meme.id+'/comments',
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
            //this.setState({modalIsOpen: false});
            //window.location.reload(true);
    }
    render(){
        //console.log(this.props.meme.memeComments)
        
        return(
            <div>
                <div style={{position: "sticky",position: "-webkit-sticky",top:"0"}}>
                    <input style={{width:"90%"}} value={this.state.newComment} onChange={this.changeHandler} autoFocus/>
                    <button style={{maxWidth:"8%"}} className="edbutt" type="submit" onClick={this.editHandled}><img src={send} className="edicon" alt="Post"/></button>
                </div>
                <div><hr/>
                {
                    this.props.meme.memeComments.length==0 
                    ? <h6>No comments here. Be the first to comment...</h6>
                    :this.props.meme.memeComments.filter(c => c.trim().length).map(comment => <div style={{wordWrap:"break-word"}}><p style={{width:"100%"}}>{comment}</p><hr/><hr/></div>).reverse()
                }   
                </div>
            </div>
        )
    }
}
export default Meme