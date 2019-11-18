import React from 'react';
import Posts from '../post/Posts';
import {isAuthenticated} from "../auth";
import {get_user} from "../user/api_user_call";
import { Redirect } from 'react-router-dom';
import '../style/loader.css';
import Welcome from './Welcome';

class Home extends React.Component {
    constructor(props){
        super(props);
        this.state={
            user:{following:[],followers:[]},
            loading:false,
            redirect:false
        }
    }

    init =userId=>{
        const token = isAuthenticated().token;
        get_user(userId,token)
            .then(data=>{
                if(data.error){
                    this.setState({redirect:true})
                }else{
                    this.setState({
                        user:data,
                        loading:false
                    })
                }
            });
    }

    componentDidMount() {
        this.setState({loading:true})
        isAuthenticated() ?
        this.init(isAuthenticated().user._id) :
            this.init(null)
    }

    render(){
        const {loading,user,redirect} = this.state;
        if(redirect) return <Redirect to={'/welcome'}/>
        return (
            loading ? <div className='load-container'> <div className='loader' ></div> </div>: (
                (isAuthenticated().user && isAuthenticated().user._id === user._id) ?
                <div className='jumbotron'>
                    <h2>Home</h2>
                    <Posts />
                </div>:'')
        )
    }
}
export default Home;