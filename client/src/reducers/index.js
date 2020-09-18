import {combineReducers} from 'redux';
import user from './users'
import cohort from './cohort.js'
import global from './global'

export default combineReducers({
    user, cohort, global
}) 