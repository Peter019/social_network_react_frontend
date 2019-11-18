import React from 'react';
import {Link,withRouter} from 'react-router-dom';
import signout from '../user/signout';
import {isAuthenticated} from "../auth/index";

const isActive = (history,path) =>{
    if(history.location.pathname ===path) return {color:'#ff9900'}
    else return {color:'#f5f5f5'}
}

const Menu =({history}) => {

    return (
        <ul className="nav nav-tabs" style={{background:'#042651'}}>
            <li className="nav-item">
                <Link className='nav-link' style={isActive(history,"/")} to="/">Home</Link>
            </li>

            {!isAuthenticated()&&(
                <>
                    <li className="nav-item">
                        <Link className='nav-link' style={isActive(history,"/signup")} to="/signup">Signup</Link>
                    </li>
                    <li className="nav-item">
                        <Link className='nav-link' style={isActive(history,"/signin")} to="/signin">Sign in</Link>
                    </li>
                </>
            )}

            {isAuthenticated()&&(
                <>
                    <li className='nav-item'>

                    <Link to={`/user/${isAuthenticated().user._id}`} className='nav-link' style={isActive(history,`/user/${isAuthenticated().user._id}`)}>
                        {isAuthenticated().user.name}
                    </Link>

                    </li>
                    <li className='nav-item'>

                        <Link to={`/post/create`} className='nav-link' style={isActive(history,`/post/create`)}>
                            Create new post
                        </Link>

                    </li>
                    <li className='nav-item'>

                        <Link to={`/users`} className='nav-link' style={isActive(history,`/users`)}>
                            Users
                        </Link>

                    </li>
                    <li className='nav-item'>

                        <Link to={`/user/discover/${isAuthenticated().user._id}`} className='nav-link' style={isActive(history,`/user/discover/${isAuthenticated().user._id}`)}>
                            Discover blogs
                        </Link>

                    </li>
                    <li className="nav-item">
                        <span className='nav-link' style={(isActive(history,"/signout"),{cursor:"pointer",color:"#f5f5f5"})} onClick={()=>signout(()=>{
                                history.push('/welcome')
                            }
                        )}>Sign out</span>
                    </li>
                </>
            )}
        </ul>
    );
}

export default withRouter(Menu);
