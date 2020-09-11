import {combineReducers} from 'redux';
import user from './users'
import cohorts from './cohort'

export default combineReducers({
    user, cohorts
}) 