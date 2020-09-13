import React from 'react';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Cohort from './components/Cohort/FormCohort.jsx'
import Profile from './components/Landing/User/profile.js';
import Settings from './components/Landing/User/Settings.js';
import Students from './components/Cohort/Students.jsx'
import AllCohorts from './components/Cohort/AllCohorts'

// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import forgotPassword from './components/Landing/forgotPassword.js';
import Contenedor from './components/Admin/Dashboard/Contenedor.js';

import theme from "./GlobalTheme.js"
import {ThemeProvider} from "@material-ui/core"
import NavBar from './components/NavBar.js';
import Home from './components/Home/home.js';

function App() {
  return (
    <ThemeProvider theme = {theme}>
      <Route path='/' component={NavBar} />
      <Route  exact path='/Home'component={Home} />
      <Route  exact path='/profile'component={Profile} />
      <Route  exact path='/profile/Settings'component={Settings} />
      <Route exact path='/'component={Landing} />
      <Route  exact path='/forgotPassword'component={forgotPassword} />
      <Route exact path = '/register' component={Register}/>
      <Route path='/admin/createCohort' render={({match}) => <Cohort match={match}/>} />
      <Route path='/cohort/:id' render={({match}) => <Cohort  match={match} />} />
      <Route exact path='/admin'component={Contenedor} />
      <Route path='/students' render={() => <Students/>} />
      <Route path='/cohorts' render={() => <AllCohorts/>} />
    </ThemeProvider>
  )
}
// const mapStateToProps = state => {
//   return {
//     algo: state.algo
//   }
// }

{/* <Route exact path='/admin' component={Dashboard} />

<Route exact path='/admin'component={Dashboard} /> */}


export default connect(null, {})(App);
