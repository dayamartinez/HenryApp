import {ADD_COHORT, UPDATE_COHORT, GET_COHORT_DETAIL, GET_COHORTS, REMOVE_COHORT, SET_COHORT, GET_GROUP_DETAIL} from '../actions/cohort.js'

const initialState = {
    cohorts: [],
    cohortDetail: {},
    groups: [],
    groupsDetail: {}

};

export default function cohort(state = initialState, action) {
    switch (action.type) {
        case ADD_COHORT:
            return {
                ...state,
                cohorts: state.cohorts.concat(action.payload),
            }
        case UPDATE_COHORT:
            return {
                ...state,
                cohorts: action.payload
            }
        case GET_COHORTS:
            return {
                ...state,
                cohorts: action.payload
            }
        case GET_COHORT_DETAIL:
            return {
                ...state,
                cohorts: action.payload
            }
        
        case REMOVE_COHORT:
            return {
                ...state,
                cohorts: state.cohorts.filter(cohort => cohort.id !== action.payload) 
            }
        case GET_GROUP_DETAIL:
            return{
                ...state,
                groups: action.payload
            }
        
            default:
                return state
    }
}