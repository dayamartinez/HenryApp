import { GET_INSTRUCTOR, GET_INSTRUCTOR_DETAIL, CREATE_STAFFMEMBER } from '../actions/instructor'

const initialState ={
    instructor:[],
    instructorDetail:{},
    staff: []
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
    if (action.type === CREATE_STAFFMEMBER){
        return {
            ...state,
            staff: state.staff.concat(action.payload)
        }
    }
    return state
}