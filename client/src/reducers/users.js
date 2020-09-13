import {ADD_USER, UPDATE_USER, RESET_PASSWORD} from '../actions/user.js'

const initialState ={
    user:{
        id: 0,
        isAdmin: false
    },
    email: [] 
}

export default function user (state = initialState, action){
    if (action.type === ADD_USER){
        return {
            ...state,
            user: action.payload
        }
    }
    if (action.type === UPDATE_USER){
        return {
            ...state,
            user: action.payload
        }
    }
    if (action.type === RESET_PASSWORD){
        return {
            ...state,
            email: action.payload
        }
    }
    return state;
}