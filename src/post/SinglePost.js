import React from "react";
import {Link} from "react-router-dom";
import {isAuthenticated} from "../auth";
import { get_single_post,update_post } from './api_post_call'
import Delete from './delete';

class SinglePost extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            post:''
        }
    }

    componentDidMount = () => {
        const id = this.props.match.params.postId;
        const token = isAuthenticated().token;
        get_single_post(token,id).then(data =>{
            if(data.error){
                console.log(data.error)
            }else{
                this.setState({post:data})
            }
        })
    }

    render(){
        const { post } = this.state;
        const author = post.postedBy ? post.postedBy.name : '';
        const id_link = post.postedBy ? `/user/${post.postedBy._id}` : '';
        const postId = this.props.match.params.postId;
        return(
            <div className="card col-md-10" style={{margin:'1%'}}>
            <div className='card-header'>
                <Link to={id_link} className="btn btn-primary" style={{color:'#9370DB'}}>{author}</Link>
                <div style={{float:'right'}}>{new Date(post.created).toDateString()}</div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <img src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}`}
                     alt={post.title} className='mb-3'
                     style={{width:'100%'}}/>
                <p className='card-text'><h5>{post.body}</h5></p>
            </div>

                <div className='d inline block'>
                    <Link to={`/post/edit/${postId}`} className="btn btn-primary">Edit post </Link>
                    <Delete postId={this.props.match.params.postId} />
                </div>

        </div>
    );

    }
}

export default  SinglePost;