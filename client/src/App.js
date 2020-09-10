import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
function App() {
  return (
    <div className="App">
      <Route  path='/'component={Landing} />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    algo: state.algo
  }
}


export default connect(mapStateToProps, null)(App);

