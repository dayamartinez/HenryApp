import React from 'react';
import {AppBar, Toolbar, Typography, IconButton, Button, makeStyles} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';


const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar,
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title:{
    flexGrow: 1
  }
}))

const NavBar = () => {
  const s = useStyles()
  return (
    <div>
      <AppBar position='fixed' color='secondary'>
        <Toolbar>
          <IconButton color='primary' className={s.menuButton}>
            <MenuIcon />
          </IconButton>
         <Typography variant='h6' className={s.title}>
          HenryApp
         </Typography>
          <Button variant='text' color = 'primary'>
            Perfil
          </Button>
        </Toolbar>
      </AppBar>
      <div className={s.offset}></div>
    </div>
  )
}


export default NavBar;
