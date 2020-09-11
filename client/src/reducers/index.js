import {combineReducers} from 'redux';
import user from './users'

/*
Hay que crear un archivo para cada estado a modificar
 */
// const initialState = {
//     algo: "algo"
// };

export default combineReducers({
    user,
}) 