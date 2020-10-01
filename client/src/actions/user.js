import axios from 'axios';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
export const SET_USER = 'SET_USER';
export const CLEAN_USER = 'CLEAN_USER';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const USER_LOGOUT = 'USER_LOGOUT';

// const instance = axios.create({
//     withCredentials: true
//   })

//CREAR USUARIO
export function addUser(data){
    return function (dispatch){
        console.log(data)
        return axios.post("http://localhost:3001/user",data)
        .then(resp=>{
            dispatch({type: ADD_USER, payload: resp.data})
            alert("Usuario creado.")
        })
        .catch(err=>{
            alert(err);
        })
        
    }
}

//LOGUEAR USUARIO!!
export function setUser (user){
    console.log(user);
    return {type:SET_USER, payload:user}
}

//DESLOGUEAR USUARIO!!
export function userLogout (user){
    console.log(user);
    return {type:USER_LOGOUT, payload:user}
}


//MODIFICAR DATOS DE MI USUARIO
export function updateUser(data){
    console.log(data)
    return function (dispatch){
        return axios.put(`http://localhost:3001/user/settings/${data.id}`, data)
        .then(res => {
            dispatch({type: UPDATE_USER, payload: res.data})
            alert("Datos Actualizados correctamente")
        })
        .catch(err =>{
            alert(err)
        })
    }
}

// RECUPERAR PASSWORD, RECIBE MAIL USER PARA RECUPERAR PASSWORD
export function ForgotPass(data){
     
    return function (dispatch){
        console.log(data)
        const {email,birthday} = data
        return axios({
            method: "PUT",
            url: `http://localhost:3001/email/send-email/forgotpassword/`,data, 
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email,
                // birthday
            }
    })
        .then(res => {
            dispatch({type: RESET_PASSWORD})
            alert("Contraseña reiniciada!")
        })
        .catch(err =>{
            alert("Usuario no encontrado!")
        })
    }
}

export function cleanUser(){
    return{type:CLEAN_USER}
} 

export function getAllUser(data) {
    if (typeof data !== "object") {
        return function (dispatch) {
            return fetch(`http://localhost:3001/user/users/${data}`)
                .then(response => response.json())
                .then(json => {
                    dispatch({
                        type: 'GET_USERS',
                        payload: json
                    });
                });
        }
    }
}

//COMPLETAR EL RESTO DE LOS DATOS DEL USUARIO INVITADO
export function setData(data){
    return function (dispatch){
        console.log(data)
        return axios.put(`http://localhost:3001/user/completeprofile/${data.id}`, data)
        .then(res => {
            dispatch({type: USER_LOGOUT, payload: res.data})
            
        })
        .catch(err =>{
            alert(err)
        })
    }
}
export function getAllUsers(data) {
    console.log(data)
    return {type:GET_ALL_USERS, payload: data}
}