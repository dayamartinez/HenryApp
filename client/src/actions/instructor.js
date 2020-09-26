import swal from 'sweetalert'
import axios from 'axios'
export const PROMOTE_INSTRUCTOR = 'PROMOTE_INSTRUCTOR'
export const GET_INSTRUCTOR = 'GET_INSTRUCTOR'
export const GET_INSTRUCTOR_DETAIL = 'GET_INSTRUCTOR_DETAIL'
export const CREATE_STAFFMEMBER = 'CREATE_STAFFMEMBER'

export function promoteInstructor(instructor) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/instructor/set`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(instructor),
    })
    .then(instructor => {
        dispatch({
          type: PROMOTE_INSTRUCTOR,
          payload: instructor
        })
        swal('usuario promovido a instructor','', 'success')
    })
    .catch(err => swal(err, '', 'error'))
  }
}


export function getInstructor() {
  return function (dispatch) {
    return fetch('http://localhost:3001/instructor', {
       credentials: 'include' })
      .then(res => res.json())
      .then(instructor =>
        dispatch({
          type: GET_INSTRUCTOR,
          payload: instructor
        })
      )
  }
}


export function getInstructorDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/instructor/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(instructor =>
        dispatch({
          type: GET_INSTRUCTOR_DETAIL,
          payload: instructor
        })
      )
  }
}

// crear miembros del Staff
export function createStaffMember(data){
  var url = 'http://localhost:3001/instructor/create';
  return function (dispatch){
    console.log('a')
    console.log(data)
    console.log('h')
    return fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
    }
    }).then(response => response.json())
    .then(json =>{
        dispatch({type: CREATE_STAFFMEMBER, payload: json})
        alert("Usuario creado.")
    })
    .catch(err=>{
        alert(err);
    })
}
}