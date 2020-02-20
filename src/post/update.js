import React from 'react';
import { update_post,get_single_post } from './api_post_call';
import {isAuthenticated} from "../auth";
import { Redirect } from "react-router-dom";

class Update extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            title:'',
            body:'',
            error:'',
            loading:false,
            success:false,
            redirectToProf:false
        }
    }

    init =(token,postId)=>{

        get_single_post(token,postId).then(data=>{
            if(data.error){
                this.setState({redirectToProf:true})
                console.log(data.error);
            }else{
                this.setState({
                    id:data.postedBy._id,
                    title:data.title,
                    body:data.body,
                    error:''
                })
            }
        })
    }

    componentDidMount() {
        this.postData = new FormData();
        const postId = this.props.match.params.postId;
        const token = isAuthenticated().token;
        this.init(token,postId);
    }

    handleChange = name => event =>{
        const value = event.target.value;
        this.postData.set(name,value);
        this.setState({[name]:value});
    }

    isValid = () => {
        const { title, body } = this.state;

        if (title.length === 0 || body.length === 0) {
            this.setState({ error: "All fields are required", loading: false });
            return false;
        }
        return true;
    };

    handleSubmit = event =>{
        event.preventDefault();
        this.setState({loading:true});

        if(this.isValid()){
            const token = isAuthenticated().token;
            const postId = this.props.match.params.postId;

            update_post(token,postId,this.postData).then(data=>{
                if(data.error){
                    this.setState({error:data.error});
                }else{
                    this.setState({
                        loading:false,
                        title:'',
                        body:'',
                        success:true
                    })
                }
            })
        }
    }

    render(){

        const { title,body,error,success,redirectToProf }  =this.state;
        if (redirectToProf) {
            return <Redirect to={`/user/${isAuthenticated().user._id}`} />;
        }

        return(
            <div className="container">
                <h2 className='mt-5 mb-5'>Edit post</h2>
                <div className='alert alert-primary' style={{display:error ? "":"none"}}>
                    {error}
                </div>
                <div className='alert alert-info' style={{display:success ? "":"none"}}>
                    Post updated successfully !
                </div>
                <form>
                    <div className='form-group'>
                        <label className='text-muted'>Title</label>
                        <input onChange={this.handleChange("title")} type='text' className='form-control' value={title}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Body</label>
                        <input onChange={this.handleChange("body")} type='text' className='form-control' value={body}/>
                    </div>
                    <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Update post</button>
                </form>
            </div>
        );
    }

}

export default Update;