import React from 'react';
import {Link} from 'react-router-dom';

class Signup extends React.Component{

    constructor(props){
        super(props);
        this.state={
            name:'',
            email:'',
            password:'',
            error:'',
            success:false
        }
    }

    handleChange = (name) => event =>{
        this.setState({error:''});
        this.setState({[name] : event.target.value})
    }

    signup = (user) =>{
        return fetch(`${process.env.REACT_APP_API_URL}/signup`,{
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

    handleSubmit =event =>{
        event.preventDefault();
        const {name,email,password} = this.state;
        const user={
            name,
            email,
            password
        }

        this.signup(user).then(res_data =>{

            if (res_data.error) this.setState({error:res_data.error})
            else this.setState({
                name:'',
                email:'',
                password:'',
                error:'',
                success:true
            });
        });
    }

    render(){
        const {name,email,password,error,success} = this.state;
        return(
            <div className='container'>
                <h2 className='mt-5 mb-5' style={{color:'#042651'}}>Signup</h2>

                <div className='alert alert-primary' style={{display:error ? "":"none",background:'#042651', color:'whitesmoke'}}>
                    {error}
                </div>

                <div className='alert alert-info' style={{display:success ? "":"none",background:'#042651', color:'whitesmoke'}}>
                    Signup successful. Please <Link to='/signin'>Sign in </Link>
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
                    <button onClick={this.handleSubmit} className='btn btn-raised btn-primary' style={{background:'#042651'}}>Submit</button>
                </form>
            </div>
        );
    }
}

export default Signup;