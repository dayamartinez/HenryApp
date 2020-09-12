import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Cohort from './components/Cohort/FormCohort.jsx'
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import Dashboard from './components/Admin/Dashboard.js';


function App() {
  return (
    <div className="App">
      <Route exact path='/'component={Landing} />
      <Route exact path = '/register' component={Register}/>

      <Route path='/admin/createCohort' render={({match}) => <Cohort match={match}/>} />
      <Route path='/cohort/:id' render={({match}) => <Cohort  match={match} />} />
      
      <Route exact path='/admin'component={Dashboard} />
    </div>
  )
}
// const mapStateToProps = state => {
//   return {
//     algo: state.algo
//   }
// }


export default connect(null, {})(App);
