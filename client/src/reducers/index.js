import {combineReducers} from 'redux';
import user from './users'
import cohort from './cohort.js'
import global from './global'
import instructor from './instructor'
import group from './group'

export default combineReducers({
    user, cohort, global, instructor, group
}) 