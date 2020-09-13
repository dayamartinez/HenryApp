import swal from 'sweetalert'
export const ADD_COHORT = 'ADD_COHORT'
export const UPDATE_COHORT = 'UPDATE_COHORT'
export const GET_COHORT_DETAIL = 'GET_COHORT_DETAIL'
export const GET_COHORTS = 'GET_COHORTS'
export const REMOVE_COHORT = 'REMOVE_COHORT'

export function addCohort(cohort) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/cohort/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cohort),
    })
      .then(res => res.json())
      .then(data => {
           dispatch({
          type: 'ADD_COHORT',
          payload: data.cohort,
<<<<<<< HEAD
        })
       swal(data.message)         
=======
        })        
>>>>>>> master
      })
      .catch(err => swal(err, '', 'error'))
  }
}

export function updateCohort(id, cohort) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/cohort/update/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cohort),
    })
    .then(res => {
      if (res.status === 400) {
        swal(res.message)
      } else {
        dispatch({
          type: 'UPDATE_COHORT',
          payload: res.cohort,
<<<<<<< HEAD
        })
        swal('Cohorte modificado correctamente','', 'success')
      }
=======
        })   
>>>>>>> master
    })
    .catch(err => swal(err, '', 'error'))
  }
}

export function getCohorts() {
  return function (dispatch) {
    return fetch('http://localhost:3001/cohort', {
       credentials: 'include' })
      .then((res) => res.json())
      .then((cohorts) =>
        dispatch({
          type: 'GET_COHORTS',
          payload: cohorts,
        })
      )
  }
}

export function getCohortDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/cohort/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(cohort =>
        dispatch({
          type: 'GET_COHORT_DETAIL',
          payload: cohort,
        })
      )
  }
}

export function removeCohort(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/cohort/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(cohort => {
        dispatch({
          type: 'REMOVE_COHORT',
          payload: cohort.id,
        })
      })
      .catch(err => swal(err))
  }
}