import React from 'react';
import { isAuthenticated } from '../auth/index';
import { delete_post } from './api_post_call';
import { Redirect } from 'react-router-dom';

class Delete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            redirect:false
        }
    }

    deletePost = () =>{
        const token = isAuthenticated().token;
        const postId = this.props.postId;
        delete_post(token,postId)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    this.setState({
                        redirect:true
                    })
                }
            })
    }

    confirmDelete =() =>{
        let answer= window.confirm('Are you sure you want to delete this post ?');
        if(answer){
            this.deletePost();
        }
    }

    render(){
        const userId = isAuthenticated().user._id;
        if(this.state.redirect){
            return(

                <Redirect to={`/user/${userId}`} />
            )
        }
        return(
            <button onClick={ this.confirmDelete } className='btn btn-primary mr-5' style={{color:'red'}}>Delete post</button>
        );
    }
}

export default Delete;