import {combineReducers} from 'redux';
import user from './users'
import cohort from './cohort.js'
import global from './global'
import instructor from './instructor'
import group from './group'
import pm from './pm'

export default combineReducers({
    user, cohort, global, instructor, group, pm
}) 