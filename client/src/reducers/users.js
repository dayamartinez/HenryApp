import {ADD_USER} from '../actions/user.js'

const initialState ={
    user:{
        id: 0,
        isAdmin: false
    }
}

export default function user (state = initialState, action){
    if (action.type === ADD_USER){
        return {
            ...state,
            user: action.payload
        }
    }

    return state;
}