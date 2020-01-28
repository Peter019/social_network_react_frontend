import React from 'react';
import {Route,Switch} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/signup';
import Signin from './user/signin';
import Menu from './core/Menu'
import Profile from './user/Profile'
import Users from './user/Users';
import Update from './user/update';
import { PrivRoute } from "./auth/PrivRoute";
import FindPeople from "./user/FindPeople";
import ProfTabs from "./user/ProfTabs";
import NewPost from "./post/NewPost";
import Welcome from './core/Welcome';
import SinglePost from './post/SinglePost'

const MainRouter =() =>{
    return(
    <div>
        <Menu />
        <Switch>
            <Route path='/signup' component={ Signup } />
            <Route path='/signin' component={ Signin } />
            <PrivRoute path='/user/discover/:userId' component={FindPeople} />
            <PrivRoute path='/user/edit/:userId' component={ Update } />
            <PrivRoute path='/user/network/:userId' component={ ProfTabs } />
            <PrivRoute path='/users' component={ Users } />
            <PrivRoute path='/user/:userId' component={ Profile } />
            <PrivRoute path='/post/create' component={ NewPost } />
            <PrivRoute path='/post/:postId' component={ SinglePost } />
            <Route path={'/welcome'} component={Welcome} />
            <Route path="/" component={Home} />
        </Switch>
    </div>
    );
}

export default MainRouter;