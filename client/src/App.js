import React from 'react';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Cohort from './components/Cohort/FormCohort.jsx'
import Students from './components/Cohort/CohortList.jsx'
import Profile from './components/Landing/User/profile.js';
import Settings from './components/Landing/User/Settings.js';
import AllCohorts from './components/Cohort/AllCohorts'
import Pms from './components/Pms/ListPm'
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import forgotPassword from './components/Landing/forgotPassword.js';
import Contenedor from './components/Admin/Dashboard/Contenedor.js';
import NewUser from './components/Landing/newUser.js'
import theme from "./GlobalTheme.js"
import {ThemeProvider} from "@material-ui/core"
import NavBar from './components/NavBar.js';
import Home from './components/Home/home.js';
import BarraLateral from './components/Admin/Dashboard/BarraLateral';


function App(props) {
  return (
    <ThemeProvider theme = {theme}>
      {props.user.user.id === 0 && <Route path='/' component={NewUser}/>}
      {props.user.user.id !== 0 && <Route path='/' component={NavBar} />}
      {props.user.user.id !== 0 && <Route  exact path='/Home'component={Home} />}
      {props.user.user.id !== 0 && <Route  exact path='/profile'component={Profile} />}
      <Route  exact path='/profile/Settings'component={Settings} />
      <Route  exact path='/forgotPassword'component={forgotPassword} />
      
      {/* MACHEA DESDE NEWUSER!! */}
      {props.user.user.id !==0 && <Route  exact path = '/' component={Register}/>}
      <Route path='/cohort/:id' render={({match}) => <Cohort  match={match} />} />
      <Route exact path='/admin'component={Contenedor} />
      <Route path='/admin' component={BarraLateral} />
      <Route exact path='/admin/students' render={() => <Students/>} />
      <Route exact path='/admin/cohorts' render={() => <AllCohorts/>} />
      <Route exact path='/admin/createCohort' render={({match}) => <Cohort match={match}/>} />
      <Route path='/pms' render={() => <Pms/>} />

    </ThemeProvider>
  )
}

const mapStateToProps = state => {
  return {
    user: state.user,
  }
}

{/* <Route exact path='/admin' component={Dashboard} />

<Route exact path='/admin'component={Dashboard} /> */}


export default connect(mapStateToProps,null)(App);
