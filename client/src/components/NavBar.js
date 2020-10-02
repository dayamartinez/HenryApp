import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Link, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SearchBar from './Home/SearchBar/searchBar.js'
import { userLogout } from '../actions/user';

import axios from 'axios';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import Menu from './MenuNavBar'
import HomeIcon from '@material-ui/icons/Home';
import Notificaciones from './Home/Notificaciones';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  title:{
    flexGrow: 1,
    justifyContent: 'flex-end',
    marginLeft: '10px'
  },
  fija:{
    zIndex: 1201
  },
  iconB: {
    marginRight: "-15px",
  },
  iconB2: {
    marginRight: "-10px",
  },
  iconB3: {
    marginLeft: "-38px",
  },
  contenedor: {
    display: "flex",
    marginLeft: "auto"
  }
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
            <ButtonGroup size="small" aria-label="small outlined button group">
            <IconButton className={s.iconB} color = 'primary'  onClick={(e) => history.push('/Home')}>
            <HomeIcon/>
          </IconButton>
            <IconButton className={s.iconB2}><Notificaciones/></IconButton>
            <IconButton color='primary' className={s.iconB3}>
            <Menu user={user}/>
          </IconButton>
          </ButtonGroup>
          <Typography variant='h6' className={s.title}>
          HenryApp
         </Typography>
        
         <div className={s.contenedor}>
         <SearchBar />     
        
        <Link onClick={(e) => history.push('/About')}>
         <Typography variant='h6' className={s.title}>
          About Us
         </Typography>
         </Link>
         </div>
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

