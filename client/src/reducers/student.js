import { GET_STUDENT, GET_STUDENT_DETAIL } from '../actions/student'

const initialState ={
    students:[],
    studentDetail:{},

}

export default function pm(state = initialState, action){
    
    if (action.type === GET_STUDENT){
        return {
            ...state,
            students: action.payload
        }
    }

    if (action.type === GET_STUDENT_DETAIL){
        return {
            ...state,
            studentDetail: action.payload
        }
    }

    return state
}