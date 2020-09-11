import React from 'react';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Profile from './components/Landing/User/profile.js';
import Settings from './components/Landing/User/Settings.js';
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import Dashboard from './components/Admin/Dashboard.js';


function App() {
  return (
    <div className="App">
      <Route  exact path='/profile'component={Profile} />
      <Route  exact path='/profile/Settings'component={Settings} />
      <Route exact path='/'component={Landing} />
      <Route exact path = '/register' component={Register}/>
      <Route exact path='/admin'component={Dashboard} />
    </div>
  );
}
const mapStateToProps = state => {
  return {
    algo: state.algo
  }
}


export default connect(mapStateToProps, null)(App);
