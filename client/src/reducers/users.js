
import {ADD_USER, UPDATE_USER, RESET_PASSWORD, SET_USER, CLEAN_USER, GET_USERS, USER_LOGOUT} from '../actions/user.js'
import { PROMOTE_PM, GET_PM, GET_PM_DETAIL} from '../actions/pm'
import { PROMOTE_INSTRUCTOR, GET_INSTRUCTOR, GET_INSTRUCTOR_DETAIL} from '../actions/instructor'
import { PROMOTE_STUDENT, GET_STUDENT, GET_STUDENT_DETAIL, SET_COHORT } from '../actions/student'



const initialState ={
    user:{
        id: 0,
        isAdmin: false
    },
    email: [],
    userDetail:{},
    searchUsers: []

}

export default function user (state = initialState, action){
    if (action.type === ADD_USER){
        return {
            ...state,
            // user: state.user.concat(action.payload)
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

    if (action.type === PROMOTE_PM){
        return {
            ...state,
            user: action.payload
        }
    }

    if (action.type === PROMOTE_INSTRUCTOR){
        return {
            ...state,
            user: action.payload
        }
    }

    if (action.type === PROMOTE_STUDENT){
        return {
            ...state,
            user: action.payload
        }
    }


    if (action.type === SET_COHORT){
        return {
            ...state,
            user: action.payload
        }
    }

    if (action.type === GET_PM){
        return {
            ...state,
            user: action.payload
        }
    }

    if (action.type === GET_INSTRUCTOR){
        return {
            ...state,
            user: action.payload
        }
    }

    if (action.type === GET_STUDENT){
        return {
            ...state,
            user: action.payload
        }
    }


    
    if (action.type === GET_INSTRUCTOR_DETAIL){
        return {
            ...state,
            userDetail: action.payload
        }
    }

    if (action.type === GET_STUDENT_DETAIL){
        return {
            ...state,
            userDetail: action.payload
        }
    }

    if (action.type === SET_USER){
        return {
            ...state,
            user: action.payload
        }
    }
    if (action.type === USER_LOGOUT){
        return{
          ...state,
          user: {}
      }
    }

    if (action.type === CLEAN_USER){
        return state = initialState
    }
    if (action.type === GET_USERS){
        return {
            ...state,
            searchUsers: action.payload
        }
    }
    return state
}