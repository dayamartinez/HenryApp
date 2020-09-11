import axios from 'axios';
export const ADD_USER = 'ADD_USER';

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