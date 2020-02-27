export const create =(userId,token,post) =>{

    return fetch(`${process.env.REACT_APP_API_URL}/post/new/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:post
    }).then(response=> {
        return response.json();
    }).catch(err=>console.log(err))
}

export const get_posts =(token,userId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=> {
        return response.json();
    }).catch(err=>console.log(err))
}

export const get_prof_posts =(token,userId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/posts/by/${userId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=> {
        return response.json();
    }).catch(err=>console.log(err))
}

export const get_single_post =(token,postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"GET",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=> {
        return response.json();
    }).catch(err=>console.log(err))
}

export const update_post = (token,postId,post) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:post
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export const delete_post = (token,postId) =>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/${postId}`,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export const like =(token,userId,postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/like`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({userId,postId})
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export const unlike =(token,userId,postId)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/unlike`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({userId,postId})
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))
}

export const comment =(token,userId,postId,comment)=>{
    return fetch(`${process.env.REACT_APP_API_URL}/post/comment`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify({userId,postId,comment})
    }).then(response=>{
        return response.json();
    }).catch(err=>console.log(err))
}

