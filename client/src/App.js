import React from 'react';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Cohort from './components/Cohort/FormCohort.jsx'
import Profile from './components/Landing/User/profile.js';
import Settings from './components/Landing/User/Settings.js';

// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import forgotPassword from './components/Landing/forgotPassword.js';
import Dashboard from './components/Admin/Dashboard.js';

import theme from "./GlobalTheme.js"
import {ThemeProvider} from "@material-ui/core"

import Home from './components/Home/home.js';

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Route  exact path='/Home'component={Home} />
      <Route  exact path='/profile'component={Profile} />
      <Route  exact path='/profile/Settings'component={Settings} />
      <Route  exact path='/'component={Landing} />
      <Route  exact path='/forgotPassword'component={forgotPassword} />
      <Route  exact path = '/register' component={Register}/>

      <Route path='/admin/createCohort' render={({match}) => <Cohort match={match}/>} />
      <Route path='/cohort/:id' render={({match}) => <Cohort  match={match} />} />
      
      <Route exact path='/admin'component={Dashboard} />
    </ThemeProvider>
  )
}
// const mapStateToProps = state => {
//   return {
//     algo: state.algo
//   }
// }


export default connect(null, {})(App);
