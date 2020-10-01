import swal from 'sweetalert'
export const PROMOTE_PM = 'PROMOTE_PM'
export const GET_PM = 'GET_PM'
export const GET_PM_DETAIL = 'GET_PM_DETAIL'
export const DELETE_PM = 'DELETE_PM'

export function promotePm(pm) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pm/set`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pm),
    })
    .then(pm => {
        dispatch({
          type: PROMOTE_PM,
          payload: pm
        })
    })
    .catch(err => swal(err, '', 'error'))
  }
}

export function getPm() {
  return function (dispatch) {
    return fetch('http://localhost:3001/pm', {
       credentials: 'include' })
      .then(res => res.json())
      .then(pm =>
        dispatch({
          type: GET_PM,
          payload: pm
        })
      )
  }
}

//Eliminar PM
export function deletePM(id){
  return function (dispatch) {
    return fetch(`http://localhost:3001/pm/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(pm => {
        dispatch({
          type: DELETE_PM,
          payload: pm.id,
        })
      })
  }
}

//FALTA REDUCERS EN USER
export function getPmDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/pm/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(pm =>
        dispatch({
          type: GET_PM_DETAIL,
          payload: pm
        })
      )
  }
}

