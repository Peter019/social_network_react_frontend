//import React from 'react';

const signout =(next) =>{

    if(typeof window !== "undefined") localStorage.removeItem("jwt&user")
    next();
    return fetch(`${process.env.REACT_APP_API_URL}/signout`,{
        method:"GET"
    }).then(res =>{
        return res.json()
    }).catch(err =>console.log(err))
}

export default signout;