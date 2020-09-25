import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './Home/SearchBar/searchBar.js'
import { userLogout } from '../actions/user';
import axios from 'axios';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Menu from './MenuNavBar'
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: "5px",
  },
  title:{
    flexGrow: 1
  },
  fija:{
    zIndex: 1201
  },
}))


export const NavBar = (props, user) => {
  const history = useHistory();
  const s = useStyles()
  const{location}=props
  if (location.pathname==="/"||location.pathname==="/register"){
    return null;
  }

//FUNCION PARA CERRAR SESION
const logout = function(e) {
  e.preventDefault(e)
    props.userLogout()

  //CON ESTA LLAMADA LE PEGAMOS A LOGOUT EN EL BACK
  axios.get('http://localhost:3001/logout')
  .then(async res=>{
    await alert("Sesión cerrada");
    history.push('/')
  })

  //MANEJO DE ERRORES...
  .catch(err=>{
    alert(err);
  })
  return;
}
  return (
    <div>
      <AppBar position='fixed' className={s.fija} color='secondary'>
        <Toolbar>
          <IconButton color = 'primary'  onClick={(e) => history.push('/Home')}>
            <HomeIcon/>
          </IconButton>
          <IconButton color='primary' className={s.menuButton}>
            <Menu user={user}/>
          </IconButton>
         <Typography variant='h6' className={s.title}>
          HenryApp
         </Typography>
         <SearchBar />
          <Button variant='text' color = 'primary' onClick={(e) => history.push('/profile')}>
            Perfil
          </Button>
          <Button variant='text' color = 'primary' onClick={(e)=>logout(e)}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <div className={s.offset}></div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout:() => dispatch(userLogout()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(NavBar);

