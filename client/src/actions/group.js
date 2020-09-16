import swal from 'sweetalert'
export const ADD_GROUP = 'ADD_GROUP'
export const UPDATE_GROUP = 'UPDATE_GROUP'
export const GET_GROUP_DETAIL = 'GET_GROUP_DETAIL'
export const GET_GROUP = 'GET_GROUP'
export const REMOVE_GROUP = 'REMOVE_GROUP'

export function addGroup(group) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/group/create`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
      .then(res => res.json())
      .then(data => {
           dispatch({
          type: 'ADD_GROUP',
          payload: data.group,

        })
       swal(data.message)                
      })
      .catch(err => swal(err, '', 'error'))
  }
}

export function updateGroup(id, group) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/group/update/${id}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(group),
    })
    .then(res => {
      if (res.status === 400) {
        swal(res.message)
      } else {
        dispatch({
          type: 'UPDATE_GROUP',
          payload: res.group,
        })
        swal('Grupo modificado correctamente','', 'success')
      }
      })  
    .catch(err => swal(err, '', 'error'))
  }
}

export function getGroups() {
  return function (dispatch) {
    return fetch('http://localhost:3001/group', {
       credentials: 'include' })
      .then((res) => res.json())
      .then((groups) =>
        dispatch({
          type: 'GET_GROUPS',
          payload: groups,
        })
      )
  }
}

export function getGroupDetail(id) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/group/${id}`, {
      credentials: 'include',
    })
      .then(res => res.json())
      .then(group =>
        dispatch({
          type: 'GET_GROUP_DETAIL',
          payload: group,
        })
      )
  }
}

export function removeGroup(id) {
  return function (dispatch) {
    fetch(`http://localhost:3001/group/${id}`, {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(group => {
        dispatch({
          type: 'REMOVE_GROUP',
          payload: group.id,
        })
      })
      .catch(err => swal(err))
  }
}