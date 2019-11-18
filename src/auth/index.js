export const isAuthenticated=()=>{

    if(typeof window !=="undefined" && localStorage.getItem("jwt&user")){
        return JSON.parse(localStorage.getItem("jwt&user"))
    }else{
        return false
    }
}