import React from 'react';
import { findPeople } from './api_user_call';
import { isAuthenticated } from '../auth/index';
import defUser from '../images/user.png';
import { Link } from 'react-router-dom';

class FindPeople extends  React.Component{

    constructor(props){
        super(props);
        this.state={
            users:[],
            error:'',
        }
    }

    componentDidMount() {
        const userId =isAuthenticated().user._id;
        const token = isAuthenticated().token;
        findPeople(userId,token).then(data =>{

            if(data.error){
                console.log(data.error)
            }else{
                this.setState({users:data})
            }
        });
    }

    renderUsers =users =>{

        return <div className='row'>
            {users.map((user,index)=> {
                const picUrl = user._id ?
                    `${process.env.REACT_APP_API_URL}/user/picture/${user._id}` : defUser;

                return <div className="card col-md-4"  key={index} style={{margin:'5%'}}>

                    <img style = {{height:'40%' , width:'40%',objectFit:'cover'}} className='card-img-top'
                         src={picUrl} alt={user.name} onError={e => (e.target.src = `${defUser}`)} />

                    <div className="card-body">
                        <h5 className="card-title">{user.name}</h5>
                        <p className="card-text">{user.name}'s blog</p>
                        <Link to={`/user/${user._id}`} className="btn btn-primary" style={{color:'#FFB6C1'}}>View profile</Link>
                    </div>
                </div>
            })}
        </div>
    }

    render(){
        const {users} = this.state;

        return(
            <div className='container'>
                <h2 className='mt-5 mb-5'>Discover</h2>
                {this.renderUsers(users)}
            </div>
        );
    }
}



export default FindPeople;