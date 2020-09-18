import swal from 'sweetalert'
export const PROMOTE_INSTRUCTOR = 'PROMOTE_INSTRUCTOR'
export const GET_INSTRUCTOR = 'GET_INSTRUCTOR'
export const GET_INSTRUCTOR_DETAIL = 'GET_INSTRUCTOR_DETAIL'

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

//FALTA REDUCERS EN USER
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

