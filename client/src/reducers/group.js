import {ADD_GROUP, UPDATE_GROUP, GET_GROUP_DETAIL, GET_GROUPS, REMOVE_GROUP} from '../actions/group.js'

const initialState = {
    groups: [],
    groupDetail: {}
};

export default function group(state = initialState, action) {
    switch (action.type) {
        case ADD_GROUP:
            return {
                ...state,
                groups: state.groups.concat(action.payload),
            }
        case UPDATE_GROUP:
            return {
                ...state,
                groups: action.payload
            }
        case GET_GROUPS:
            return {
                ...state,
                groups: action.payload
            }
        case GET_GROUP_DETAIL:
            return {
                ...state,
                groups: action.payload
            }
        case REMOVE_GROUP:
            return {
                ...state,
                groups: state.groups.filter(group => group.id !== action.payload) 
            }
            default:
                return state
    }
}