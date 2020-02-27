import React from 'react';
import { isAuthenticated } from '../auth/index';
import { Redirect,Link } from 'react-router-dom';
import { get_user,followUser,unfollowUser} from './api_user_call';
import defUser from '../images/user.png';
import Delete from './delete';
import '../style/loader.css';
import ProfTabs from './ProfTabs';
import {get_prof_posts, like, unlike} from "../post/api_post_call";
import { renderPosts } from '../post/Posts';

class Profile extends React.Component{

    constructor(props){
        super(props);
        this.state={
            user:'',
            redirectToSignin:false,
            following:false,
            error:'',
            loading:false,
            posts:[],
            noposts:false,
            showModal:false
        }
    }

    init =userId=> {
        const token = isAuthenticated().token;
        get_user(userId, token)
            .then(data => {
                if (data.error) {
                    this.setState({redirectToSignin: true})
                } else {
                    let following = this.checkFollow(data);
                    this.setState({
                        user: data,
                        following: following,
                    })
                }
            });
        get_prof_posts(token, userId).then(data => {
            if (data.error) {
                this.setState({redirectToSignin: true})
            } else {
                if(data.length===0){
                    this.setState({noposts:true})
                }
                this.setState({posts: data, loading: false})
            }
        })
    }


    follow = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        followUser(userId, token, this.state.user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ user: data, following: true });
            }
        });
    };

    unfollow = () => {
        const userId = isAuthenticated().user._id;
        const token = isAuthenticated().token;

        unfollowUser(userId, token, this.state.user._id).then(data => {
            if (data.error) {
                this.setState({ error: data.error });
            } else {
                this.setState({ user: data, following: false});
            }
        });
    };

    checkFollow=(user_data)=>{
        const auth = isAuthenticated();
        const match = user_data.followers.find(follower =>{
            return follower._id ===auth.user._id
        })
        return match;
    }

    componentDidMount() {

        const userId = this.props.match.params.userId;
        this.setState({loading:true})
        this.init(userId);

    }

    componentWillReceiveProps(nextProps) {

        const userId = nextProps.match.params.userId;
        this.init(userId)
    }

    renderProfPosts =posts =>{
        const {loading,noposts} = this.state;
        return (
            loading ? <div className='load-container'> <div className='loader' ></div> </div> :
                noposts ? <div className='jumbotron'><h2>No posts :(</h2></div> :
                    <div className='row' style={{width:'150%'}}>
                        {posts.map((post,i)=> {
                            return (
                                <div className="card col-md-3"  key={i} style={{margin:'1%' }}>
                                    <div className="card-body" >
                                        <h5 className="card-title">{post.title}</h5><hr/>
                                        <img src={`${process.env.REACT_APP_API_URL}/post/picture/${post._id}`}
                                             alt={post.title} className='mb-3'
                                             style={{width:'100%'}}/>
                                        <p className='card-text'><h5>{post.body}</h5></p>
                                    </div>
                                    <div className='d inline block'>
                                        <button className="btn btn-primary far fa-heart" onClick={function() {
                                            let apiCall = post.likes.includes(isAuthenticated().user._id) ? unlike : like;
                                            let token = isAuthenticated().token;
                                            let userId = isAuthenticated().user._id;
                                            let id = post._id;
                                            apiCall(token, userId, id).then(data => {
                                                if (data.error) console.log(data.error);
                                                post=data;
                                            })
                                        }}></button>
                                        {post.likes.length}
                                        <Link to={`/post/${post._id}`} className="btn btn-primary" style={{color:'#9370DB'}}>More</Link>
                                    </div>
                                </div>

                            )
                        })}
                    </div>
        )
    }


    render(){
        const {redirectToSignin ,user,following,loading,posts} = this.state;
        const picUrl = user._id ?
            `${process.env.REACT_APP_API_URL}/user/picture/${user._id}` : defUser;

        if(redirectToSignin) return <Redirect to='/signin'/>;
        return(
            loading ? <div className='load-container'> <div className='loader' ></div> </div>: (
            <div className='container mt-5'>

                <div className='row'>

                    <img style = {{height:'200px' , width:'auto'}} className='card-img-top'
                         src={picUrl} alt={user.name} onError={e => (e.target.src = `${defUser}`)} />

                    <div className='lead ml-5 mt-4'>
                        <h2 >{user.name}</h2>
                        <p>{user.email}</p>
                        <p> {`Joined ${new Date(user.created).toDateString()}`}</p>

                        {(isAuthenticated().user && isAuthenticated().user._id === user._id) ?(
                            <div>
                            <div className='d-inline-block mt-5'>
                                <Link className='btn btn-primary mr-5'
                                      to={`/user/edit/${user._id}`} style={{color:'#042651'}}>Edit profile</Link>

                                <Delete userId={ user._id }/>

                            </div>
                            <div className='d-inline-block mt-5'>
                            <Link className='btn btn-primary'
                            to={`/user/network/${user._id}`} style={{color:'#042651'}}>Network</Link>
                            </div>
                            </div>

                        ) : (!following ? (
                            <div>
                            <div className='d-inline-block mt-5'>
                                <button onClick={this.follow} className='btn btn-primary' style={{color:'#042651'}}>Follow</button>
                            </div>

                            <div className='d-inline-block mt-5'>
                            <Link className='btn btn-primary'
                            to={`/user/network/${user._id}`} style={{color:'#042651'}}>Network</Link>
                            </div>
                            </div>
                        ): (
                            <div>
                                <div className='d-inline-block mt-5'>
                                <button onClick={this.unfollow} className='btn btn-primary' style={{color:'red'}}>Unfollow</button>
                                </div>

                                <div className='d-inline-block mt-5'>
                                    <Link className='btn btn-primary'
                                          to={`/user/network/${user._id}`} style={{color:'#042651'}}>Network</Link>
                                </div>
                            </div>
                        ))}
                    </div>

                </div>
                <div className='row'>
                    <div className='col md-12 mt-5'>
                        <hr/>
                        <p className='lead'> { user.about }</p>
                        <hr/>
                    </div>
                </div>
                <div className='row'>
                    <div className='col md-4'>
                        <h3>Posts</h3>
                    </div>
                </div>

                {this.renderProfPosts(posts)}

            </div>
            )
        );
    }
}

export default Profile;