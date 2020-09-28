export const ADD_LINK = 'ADD_LINK'
export const GET_LINKS = 'GET_LINKS'
export const DELETE_LINK = 'DELETE_LINK'

export function addLink(links, name, module, staffId, id) {
    return function (dispatch) {
      return fetch(`http://localhost:3001/links/${id}`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({links, name, module, staffId}),
      })
        .then(res => res.json())
        .then(data => {
          dispatch({
            type: ADD_LINK,
            payload: data,
          })             
        })
    }
  }
  
  
  export function getLinks() {
    return function (dispatch) {
      return fetch('http://localhost:3001/links', {
         credentials: 'include' })
        .then((res) => res.json())
        .then(links =>
          dispatch({
            type: GET_LINKS,
            payload: links,
          })
        )
    }
  }
  
  export function deleteLink(id) {
    return function (dispatch) {
      fetch(`http://localhost:3001/links/${id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(link => {
          dispatch({
            type: DELETE_LINK,
            payload: link.id,
          })
        })   
    }
  }