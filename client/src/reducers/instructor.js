import { GET_INSTRUCTOR, GET_INSTRUCTOR_DETAIL } from '../actions/instructor'

const initialState ={
    user:[{
        id: 0,
        //isAdmin: false
    }],
    email: []
}

export default function instructor (state = initialState, action){
    if (action.type === GET_INSTRUCTOR){
        return {
            ...state,
            user: action.payload
        }
    }
    return state
}