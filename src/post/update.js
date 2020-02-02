import React from 'react';
import { update } from './api_post_call';

class Update extends React.Component{

    constructor(props){
        super(props);
        this.state={
            id:'',
            name:'',
            email:'',
            password:'',
            redirectToProf:false,
            error:'',
            fileSize:0,
            about:''
        }
    }

    init =(postId)=>{

    }

}