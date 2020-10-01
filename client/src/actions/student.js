import swal from 'sweetalert'
export const PROMOTE_STUDENT = 'PROMOTE_STUDENT'
export const GET_STUDENT = 'GET_STUDENT'
export const GET_STUDENT_DETAIL = 'GET_STUDENT_DETAIL'
export const SET_COHORT = 'SET_COHORT'

export function promoteStudent(student) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/student`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    })
    .then(student => {
        dispatch({
          type: PROMOTE_STUDENT,
          payload: student
        })
        
    })
    .catch(err => swal(err, '', 'error'))
  }
}

export function setCohort(id, user) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/admin/setcohort/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(user => {
      dispatch({
        type: SET_COHORT,
        payload: user,
      })
    })  
    .catch(err => (err, '', 'error'))
  }
}

export function getStudents() {
  return function (dispatch) {
    return fetch('http://localhost:3001/student', {
       credentials: 'include' })
      .then(res => res.json())
      .then(student =>
        dispatch({
          type: GET_STUDENT,
          payload: student
        })
      )
  }
}

export function getStudentDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/student/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(student =>
        dispatch({
          type: GET_STUDENT_DETAIL,
          payload: student
        })
      )
  }
}

