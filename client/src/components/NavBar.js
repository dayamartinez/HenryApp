import React from 'react';
import {AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  offset: theme.mixins.toolbar
}))

const NavBar = () => {
  const classes = useStyles()
  return (
    <div>
      <AppBar position='fixed' color='primary'>
        <Toolbar>
         <Typography variant='h6'>

         </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.offset}></div>
    </div>
  )
}


export default NavBar;
