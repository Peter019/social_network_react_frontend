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

