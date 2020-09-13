import axios from 'axios';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';
export const RESET_PASSWORD = 'RESET_PASSWORD';
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


//MODIFICAR DATOS DE MI USUARIO

export function updateUser(data){
    return function (dispatch){
        console.log(data)
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
    let email = data.email; 
    return function (dispatch){
        console.log(data)
        return axios({
            method: "POST",
            url: `http://localhost:3001/email/send-email/forgotPassword/${data.email}`, 
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                email
            }
    })
        .then(res => {
            dispatch({type: RESET_PASSWORD, payload: res.data})
            alert("Datos Actualizados correctamente")
        })
        .catch(err =>{
            alert(err)
        })
    }
}

