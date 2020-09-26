import React from 'react';
import './App.css';
import { connect } from "react-redux";
import {Redirect, Route} from 'react-router-dom';
import Register from './components/Landing/Register.js'
import Cohort from './components/Cohort/FormCohort.jsx'
import Students from './components/Cohort/CohortList.jsx'
import Profile from './components/Landing/User/profile.js';
import Settings from './components/Landing/User/settings.js';
import PasswordSettings from './components/Landing/User/passwordSetting.js';
import FotoPerfil from './components/Landing/User/imgChange.js';
import FotoPortada from './components/Landing/User/changeImg.js';
import AllCohorts from './components/Cohort/AllCohorts'
import Pms from './components/Pms/ListPm'
import CohortDetail from './components/CohortDetail/CohortDetail'
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
import forgotPassword from './components/Landing/forgotPassword.js';
import Contenedor from './components/Admin/Dashboard/Contenedor.js';
import NewUser from './components/Landing/newUser.js'
import AllGroups from "./components/Groups/AllGroups.js"
import theme from "./GlobalTheme.js"
import {ThemeProvider} from "@material-ui/core"
import NavBar from './components/NavBar.js';
import Home from './components/Home/home.js';
import BarraLateral from './components/Admin/Dashboard/BarraLateral';
import Instructor from './components/Instructors/ListInstructors';
import StaffRegister from './components/Instructors/CreateInstructor';
import ConfiguracionGeneral from './components/Landing/User/profileSettings.js';
import FormGroup from './components/Groups/FormGroup';

import UserCard from './components/Home/SearchBar/userCards'


function App(props) {
  const margen = {marginLeft:"240px"} // guardo el estilo en una unica variable y se las paso al componente por props
  return (
    <ThemeProvider theme = {theme}>
      <Route exact path='/inviteuser'>
        {!props.user.user.id ? <NewUser/> : <Register/>}
      </Route>
      {/* {!props.user.user.id ? <Route exact path='/' component={NewUser}/> : } */}
      {props.user.user.name && <Route path='/' component={NavBar} />}
      {props.user.user.name ? <Route  exact path='/Home'component={Home} />:null}
      {props.user.user.name ? <Route  exact path='/profile'component={Profile} />:null}

      {/* <Route  exact path='/forgotPassword'component={forgotPassword} /> */}
      {/* <Route  exact path='/profile/Settings'component={Settings} /> */}
      <Route  exact path='/forgotpassword'component={forgotPassword} />
      <Route exact path='/'>
        {!props.user.user.name ? <Landing/> :<Redirect to='/'/>}
      </Route>
      {/* {!props.user.user.id ? <Route exact path='/' component={Landing}/>:null} */}
      {props.user.user.name ? <Route exact path='/search' component={UserCard}/>:null}
      <Route path='/cohort/:id' render={({match}) => <Cohort  match={match} />} />
      <Route exact path='/admin'component={Contenedor} />
      <Route path='/admin' component={BarraLateral} />
      {/* Seccion settings user */}
      <Route exact path='/profile/Settings/UserSettings'component={ConfiguracionGeneral} />
      <Route exact path='/profile/Settings/Perfil' component={FotoPerfil} />
      <Route exact path='/profile/Settings/Portada' component={FotoPortada} />
      <Route exact path='/profile/Settings/PasswordSettings' component={PasswordSettings} />
      <Route exact path='/profile/Settings'component={Settings} />
      
      {/*---------------------------------------------------------------------------------
      rutas del admin */}

      {/* Cohortes */}
      <Route exact path='/admin/cohorts' render={() => <AllCohorts style={margen}/>} />
      <Route exact path='/cohortDetail/:id' render={({match}) => <CohortDetail match={match}/>} />
      <Route exact path='/admin/instructors' render={() => <Instructor style={margen}/>} />
      <Route exact path='/admin/createStaff' render={() => <StaffRegister style={margen}/>} />
      <Route exact path='/admin/createCohort' render={({match}) => <Cohort match={match} style={margen}/>} /> 
      
      {/* Grupos */}
      <Route exact path='/admin/groups' render={() => <AllGroups style={margen}/>} />
      <Route exact path='/admin/pms' render={() => <Pms style={margen}/>} />
      <Route exact path='/admin/createCohort/groups' render={() => <FormGroup style={margen}/>} />
      
      {/* Estudiantes */}
      <Route exact path='/admin/students' render={() => <Students style={margen}/>} />
    {/*----------------------------------------------------------------------------------*/}


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
