import axios from "axios"
import * as actionTypes from "./actionTypes"
export const authStart = ()=>{
    return{
        type:actionTypes.AUTH_START
    }
}
export const authSuccess=(token,userId)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    }
}
export const authFail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = ()=>{
    return {
        type:actionTypes.AUTH_LOGOUT,

    }
}

export const checkAuthTimeout = (expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime*1000)
    }
}
export const auth=(email,password,isSignup)=>{
    return dispatch =>{
        dispatch(authStart())
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAmGyTa7Hwr9TwE8TJR3oBSN9Rd65_3Ib0'
       if(!isSignup){
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAmGyTa7Hwr9TwE8TJR3oBSN9Rd65_3Ib0'
       }
        axios.post(url,authData)
        .then(res=>{
            console.log(res.data)
            dispatch(authSuccess(res.data.idToken,res.data.localId))
            dispatch(checkAuthTimeout(res.data.expiresIn))
        })
        .catch(error=>{
            console.log(error.message)
            dispatch(authFail(error.response.data.error))             
        })
    }

}
export const setRedirectPath=(path)=>{
    return{
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}