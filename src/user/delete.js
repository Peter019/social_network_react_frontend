import React from 'react';
import { isAuthenticated } from '../auth/index';
import { del_user } from './api_user_call';
import signout from './signout';
import { Redirect } from 'react-router-dom';

class Delete extends React.Component{

    constructor(props){
        super(props);
        this.state={
            redirect:false
        }
    }

    deleteAcc = () =>{
        const token = isAuthenticated().token;
        const userId =this.props.userId
        del_user(userId,token)
            .then(data=>{
                if(data.error){
                    console.log(data.error)
                }else{
                    signout(() =>console.log('user deleted'))
                    this.setState({redirect:true});
                }
            })
    }

    confirmDelete =() =>{
        let answer= window.confirm('Are you sure you want to delete your profile ?');
        if(answer){
            this.deleteAcc();
        }
    }

    render(){
        if(this.state.redirect){
            return(
                <Redirect to='/home'/>
            )
        }
        return(
            <button onClick={ this.confirmDelete } className='btn btn-primary mr-5' style={{color:'red'}}>Delete profile</button>
        );
    }
}

export default Delete;