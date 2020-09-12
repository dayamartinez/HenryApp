import swal from 'sweetalert'
export const ADD_COHORT = 'ADD_COHORT'
export const UPDATE_COHORT = 'UPDATE_COHORT'
export const GET_COHORT_DETAIL = 'GET_COHORT_DETAIL'
export const GET_COHORTS = 'GET_COHORTS'

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
        })        
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
    }).then( res => {
        dispatch({
          type: 'UPDATE_COHORT',
          payload: res.cohort,
        })   
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