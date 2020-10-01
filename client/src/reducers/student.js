import { GET_STUDENT, GET_STUDENT_DETAIL } from '../actions/student'
import { PROMOTE_PM} from '../actions/pm'
const initialState ={
    students:[],
    studentDetail:{},

}

export default function student(state = initialState, action){
    
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