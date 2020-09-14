import swal from 'sweetalert'
export const PROMOTE_PM = 'PROMOTE_PM'
export const GET_PM = 'GET_PM'
export const GET_PM_DETAIL = 'GET_PM_DETAIL'

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
        swal('usuario promovido a pm','', 'success')
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

