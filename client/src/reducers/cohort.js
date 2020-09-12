import {ADD_COHORT, UPDATE_COHORT, GET_COHORT_DETAIL, GET_COHORTS} from '../actions/cohort.js'

const initialState = {
    cohorts: [],
    cohortDetail: {}
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
                cohortDetail: action.payload
            }
            default:
                return state
    }
}