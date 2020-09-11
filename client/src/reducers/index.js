/*
Hay que crear un archivo para cada estado a modificar
 */
const initialState = {
    algo: "algo",
    cohorts: [],
    cohortDetail: {}
};

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'ADD_COHORT':
            return {
                ...state,
                cohorts: state.cohorts.concat(action.payload),
            }
        case 'UPDATE_COHORT':
            return {
                ...state,
                cohorts: action.payload
            }
        case 'GET_COHORTS':
            return {
                ...state,
                cohorts: action.payload
            }
        case 'GET_COHORT_DETAIL':
            return {
                ...state,
                cohortDetail: action.payload
            }
            default:
                return state
    }
}

export default rootReducer;
