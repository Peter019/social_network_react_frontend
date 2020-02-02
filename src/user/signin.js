import React from 'react';
import {Redirect} from 'react-router-dom';
import '../style/loader.css';

class Signin extends React.Component {

    constructor(props){
        super(props);
        this.state={
            email:'',
            password:'',
            error:'',
            redirect:false,
            loading:false
        }
    }

    handleChange = (arg) => event =>{

        this.setState({error:''});
        this.setState({[arg] : event.target.value})
    }

    signin = (user) =>{

        return fetch(`${process.env.REACT_APP_API_URL}/signin`,{
            method:"POST",
            headers:{
                Accept:"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res =>{
            return res.json();
        }).catch(err => console.log(err));
    }

    authenticate(jwt,next){
        if(typeof window !== "undefined"){
            localStorage.setItem("jwt&user", JSON.stringify(jwt))
            next();
        }
    }

    handleSubmit =event =>{
        event.preventDefault();
        this.setState({loading:true});
        const {email,password} = this.state;
        const user={
            email,
            password
        }

        this.signin(user).then(res_data =>{

            if (res_data.error) this.setState({error:res_data.error ,loading:false})
            else {
                //authenticate
                this.authenticate(res_data ,()=>{
                    this.setState({redirect:true})
                })
            }
        });
    }

    render(){
        const {email,password,error,redirect,loading} = this.state;

        if(redirect){
            return <Redirect to="/"/>
        }

        return(
            loading ? <div className='load-container'> <div className='loader' ></div> </div>: (
            <div className='container'>
                <h2 className='mt-5 mb-5' style={{color:'#042651'}}>Sign in</h2>

                <div className='alert alert-primary' style={{display:error ? "":"none",background:'#042651', color:'whitesmoke'}}>
                    {error}
                </div>
                {loading ? <div className='load-container'> <div className='loader' ></div> </div> : ""}
                <form>
                    <div className='form-group'>
                        <label className='text-muted'>Email</label>
                        <input onChange={this.handleChange("email")} type='email' className='form-control' value={email}/>
                    </div>
                    <div className='form-group'>
                        <label className='text-muted'>Password</label>
                        <input onChange={this.handleChange("password")} type='password' className='form-control' value={password}/>
                    </div>
                    <button onClick={this.handleSubmit} className='btn btn-raised btn-primary' style={{background:'#042651'}}>Submit</button>
                </form>
            </div>
            )
        );
    }

}

export default Signin;