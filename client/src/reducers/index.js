import {combineReducers} from 'redux';
import user from './users'
import cohort from './cohort.js'

export default combineReducers({
    user, cohort
}) 