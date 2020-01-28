import React from 'react';
import defUser from '../images/user.png';
import { Link } from 'react-router-dom';
import {get_user} from "./api_user_call";
import {isAuthenticated} from "../auth";

class ProfTabs extends React.Component{

    constructor(props){
        super(props);
        this.state={
            redirectToProf:false,
            user:{following:[],followers:[]}
        }
    }
    init (userId,token){
        get_user(userId,token).then(data=>{
            if(data.error){
                this.setState({
                    redirectToProf:true
                })
            }
            this.setState({
                user:data
            })
        })
    }
    componentDidMount() {
        const userId = this.props.match.params.userId;
        const token = isAuthenticated().token;
        this.init(userId,token);
    }

    render(){
        const { user } =this.state;
        return(
          <div className='container'>
              <div className='row ml-5'>
                  <div className='col-md-4'>
                      <h4 className='text-primary' style={{color:'#042651'}}>Followers</h4>
                      {user.followers.map((follower, i) => {
                          return <div key={i}>
                              <hr/>
                              <div className='row mb-2'>
                                  <Link to={`/user/${follower._id}`}>
                                      <img src={`${process.env.REACT_APP_API_URL}/user/picture/${follower._id}`}
                                           className='float-left mr-2'
                                           height='60px'
                                           onError={i => (i.target.src = `${defUser}`)}
                                           alt={follower.name}
                                      />
                                      <div className='float-right mt-2'>
                                          <h4 style={{color:'#042651'}}>{follower.name}</h4>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      })}
                  </div>

                  <div className='col-md-4 '>
                      <h4 className='text-primary' style={{color:'#042651'}}>Following</h4>
                      {user.following.map((follower, i) => {
                          return <div key={i}>
                              <hr/>
                              <div className='row mb-2'>
                                  <Link to={`/user/${follower._id}`}>
                                      <img src={`${process.env.REACT_APP_API_URL}/user/picture/${follower._id}`}
                                           className='float-left mr-2'
                                           height='60px'
                                           onError={i => (i.target.src = `${defUser}`)}
                                           alt={follower.name}
                                      />
                                      <div className='float-right mt-2'>
                                          <h4 style={{color:'#042651'}}>{follower.name}</h4>
                                      </div>
                                  </Link>
                              </div>
                          </div>
                      })}
                  </div>
              </div>
          </div>
        )
    }
}


export default ProfTabs;