import React from 'react';
import { get_posts } from './api_post_call';
import { isAuthenticated } from '../auth/index';
import defUser from '../images/user.png';
import { Link } from 'react-router-dom';
import {get_user} from "../user/api_user_call";

class Posts extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            posts:[],
            loading:false,
            noposts:false
        }
    }

    init = (token,id) =>{
        get_posts(token,id).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                if(data.length===0){
                    this.setState({noposts:true})
                }
                this.setState({posts:data,loading:false});
            }
        });
    }

    componentDidMount() {
        this.setState({loading:true});
        const token = isAuthenticated().token;
        const id = isAuthenticated().user._id;
        this.init(token,id);
    }

    renderPosts =posts =>{
        const {loading,noposts} = this.state;
        return (
            loading ? <div className='load-container'> <div className='loader' ></div> </div> :
                noposts ? <div className='jumbotron'><h2>No posts :(</h2></div> :
            <div className='row'>
            {posts.map((post,i)=> {
                const author = post.postedBy ? post.postedBy.name : '';
                const id = post.postedBy ? `/user/${post.postedBy._id}` : '';
                return (
                    <div className="card col-md-10"  key={i} style={{margin:'1%'}}>
                    <div className='card-header'>
                        <Link to={id} className="btn btn-primary" style={{color:'#9370DB'}}>{author}</Link>
                        <div style={{float:'right'}}>{new Date(post.created).toDateString()}</div>
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{post.title}</h5>
                        <img src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}`}
                              alt={post.title} className='mb-3'
                             style={{width:'100%'}}/>
                        <p className='card-text'>{post.body}</p>
                    </div>
                </div>
                )
            })}
        </div>

        )
    }

    render(){
        const {posts} = this.state;

        return(
            <div className='container'>
                {this.renderPosts(posts)}
            </div>
        );
    }
}



export default Posts;