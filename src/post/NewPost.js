import React from 'react';
import { isAuthenticated } from '../auth/index';
//import { get_user } from "./api_user_call";
import {Link, Redirect} from 'react-router-dom';
import { create } from './api_post_call';
import defUser from '../images/user.png';


class NewPost extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: '',
            user: {},
            fileSize:0,
            error:'',
            success:false,
            picture:''
        }
    }

    componentDidMount(){
        this.postData = new FormData();
        this.setState({user:isAuthenticated().user})
    }

    isValid =() => {
        const {title,body, fileSize} = this.state;
        if (title.length === 0) {
            this.setState({error: "Title is required"});
            return false;
        }
        if (body.length === 0) {
            this.setState({error: "Body is required"});
            return false;
        }
        //5 MB
        if (fileSize > 500000) {
            this.setState({error: "File size should be less than 5 MB"});
            return false;
        }
        return true;
    }


    handleSubmit =event => {

        event.preventDefault();
        if(this.isValid()) {
            const userId = isAuthenticated().user._id;
            const token = isAuthenticated().token;

            create(userId, token, this.postData).then(res_data => {

                if (res_data.error) this.setState({error: res_data.error});
                else {
                    this.setState({title:'',body:'',success:true})
                }
            });
        }
    }


    handleChange = (name) => event =>{
        const value = name ==='picture' ? event.target.files[0] : event.target.value;
        const fileSize =name ==='picture' ? event.target.files[0].size : 0;
        this.postData.set(name,value)
        this.setState({error:'',success:false});
        this.setState({[name] : value , fileSize})
    }


    render(){

        const { title,body,picture,success,error }  =this.state;

        return(
            <div className="container">
                <h2 className='mt-5 mb-5'>Create new post</h2>
                <div className='alert alert-primary' style={{display:error ? "":"none"}}>
                    {error}
                </div>
                <div className='alert alert-info' style={{display:success ? "":"none"}}>
                    Post created successfully !
                </div>
                <form>
                    <div className='form-group'>
                        <label className='text-muted'>Picture</label>
                        <input onChange={this.handleChange("picture")} type='file' accept="image/*" className='form-control'/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Title</label>
                        <input onChange={this.handleChange("title")} type='text' className='form-control' value={title}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Body</label>
                        <input onChange={this.handleChange("body")} type='text' className='form-control' value={body}/>
                    </div>
                    <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Create post</button>
                </form>

            </div>
        );
    }


}


export default NewPost;