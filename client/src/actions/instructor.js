import swal from 'sweetalert'
export const GET_INSTRUCTOR = 'GET_INSTRUCTOR'
export const GET_INSTRUCTOR_DETAIL = 'GET_INSTRUCTOR_DETAIL'


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

//FALTA REDUCER
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

