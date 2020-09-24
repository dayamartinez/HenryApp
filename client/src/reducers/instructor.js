import { GET_INSTRUCTOR, GET_INSTRUCTOR_DETAIL } from '../actions/instructor'

const initialState ={
    instructor:[],
    instructorDetail:{}
}

export default function instructor (state = initialState, action){
    if (action.type === GET_INSTRUCTOR){
        return {
            ...state,
            instructor: action.payload
        }
    }
    if (action.type === GET_INSTRUCTOR_DETAIL){
        return {
            ...state,
            instructorDetail: action.payload
        }
    }
    return state
}