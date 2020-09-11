import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index.js";
import thunk from "redux-thunk";
import {composeWithDevTools} from 'redux-devtools-extension';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(
    //EL INDEX DEL REDUCER DONDE VAMOS A TENER LOS ESTADOS EN REDUX!
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk),
  ));
  

export default store;