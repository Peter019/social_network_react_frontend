import React from 'react';
import { isAuthenticated } from '../auth/index';
import { get_user } from "./api_user_call";
import { Redirect } from 'react-router-dom';
import { update } from './api_user_call';
import defUser from '../images/user.png';
import { updateLocalStor } from './api_user_call';

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

    init =userId=>{
        const token = isAuthenticated().token;
        get_user(userId,token)
            .then(data=>{
                if(data.error){
                    this.setState({redirectToProf:true})
                }else{
                    this.setState({
                        id:data._id,
                        name:data.name,
                        email:data.email,
                        error:'',
                        about:data.about,

                    })
                }
            });

    }

    componentDidMount() {
        this.userData = new FormData();
        const userId = this.props.match.params.userId;
        this.init(userId);
    }

    isValid =() =>{
        const {name,email,password,fileSize} =this.state;
        if(name.length ===0){
            this.setState({error:"Name is required"});
            return false;
        }
        //5 MB
        if(fileSize>500000){
            this.setState({error:"File size should be less than 5 MB"});
            return false;
        }
        if(!/^\w+([\,-]?\w+)*@\w+([\.-]?\w)*(\.\w{2,3})+$/.test(email)){
            this.setState({error:"Provide valid email"});
            return false;
        }
        if(password.length >=1 && (password.length<8 || password.length>40)){
            this.setState({error:"'Password must have between 8 and 40 characters"})
            return false;
        }
        return true;
    }


    handleSubmit =event => {

        event.preventDefault();
        if(this.isValid()) {
            const userId = this.props.match.params.userId;
            const token = isAuthenticated().token;

            update(userId, token, this.userData).then(res_data => {

                if (res_data.error) this.setState({error: res_data.error})
                else {
                    updateLocalStor(res_data, () => {
                        this.setState({redirectToProf: true});
                    });
                }
            });
        }
    }


    handleChange = (name) => event =>{
        const value = name ==='picture' ? event.target.files[0] : event.target.value;
        const fileSize =name ==='picture' ? event.target.files[0].size : 0;
        this.userData.set(name,value)
        this.setState({error:''});
        this.setState({[name] : value , fileSize})
    }


    render(){

        const { name,email,password,redirectToProf,id,error,about }  =this.state;

        const picUrl = id ?
            `${process.env.REACT_APP_API_URL}/user/picture/${id}` : defUser;

        if (redirectToProf){
            return <Redirect to={`/user/${id}`} />;
        }
        return(
            <div className="container">
                <h2 className='mt-5 mb-5'>Edit Profile</h2>
                <div className='alert alert-primary' style={{display:error ? "":"none"}}>
                    {error}
                </div>
                <form>
                    <div className='form-group'>
                        <label className='text-muted'>Name</label>
                        <input onChange={this.handleChange("name")} type='text' className='form-control' value={name}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Email</label>
                        <input onChange={this.handleChange("email")} type='email' className='form-control' value={email}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Password</label>
                        <input onChange={this.handleChange("password")} type='password' className='form-control' value={password}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>About</label>
                        <textarea onChange={this.handleChange("about")} type='text' className='form-control' value={about}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Profile picture</label>
                        <input onChange={this.handleChange("picture")} type='file' accept="image/*" className='form-control'/>
                        <img style = {{height:'200px' , width:'auto'}} className='img-thumbnail' src={picUrl} alt={name} />
                    </div>
                    <button onClick={this.handleSubmit} className='btn btn-raised btn-primary'>Update</button>
                </form>

            </div>
        );
    }


}


export default Update;