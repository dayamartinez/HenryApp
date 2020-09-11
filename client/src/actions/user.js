import axios from 'axios';
export const ADD_USER = 'ADD_USER';
export const UPDATE_USER = 'UPDATE_USER';

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
        return axios.put(`http://localhost:3001/user/settings/${data.id}`)
        .then(res => {
            dispatch({type: UPDATE_USER, payload: res.data})
            alert("Datos Actualizados correctamente")
        })
        .catch(err =>{
            alert(err)
        })
    }
}