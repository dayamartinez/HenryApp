import {combineReducers} from 'redux';
import user from './users'
import cohort from './cohort.js'
import global from './global'
import instructor from './instructor'
import group from './group'
import pm from './pm'
import posts from './posts'
import link from './link'

export default combineReducers({
    user, cohort, global, instructor, group, pm, posts, link
}) 