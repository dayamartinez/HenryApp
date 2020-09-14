import React from 'react';
import {makeStyles, Box, Grid, Paper, Container} from '@material-ui/core';
import BarraLateral from './BarraLateral';
import clsx from 'clsx';

const estilos = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
  },
  content:{
    //backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
    marginLeft: 240,
    width: '100%'
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
  toolbar: theme.mixins.toolbar
}))
const Contenedor = () => {

  const s = estilos();
  const fixedHeightPaper = clsx(s.paper, s.fixedHeight);
  return(
    <div className={s.root}>
      <div className={s.toolbar}></div>
      <div className={s.content}>
      <Container maxWidth="lg" className={s.container}> 
        <Grid container spacing={3}>
          <Grid item xs={12} sm ={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
                Prueba 2
              </Paper>
          </Grid >
          <Grid item xs={12} sm ={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
                Prueba 2
              </Paper>
          </Grid>
          <Grid item xs={12} sm ={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
                Prueba 2
              </Paper>
          </Grid>
          <Grid item xs={12} sm ={12} md={6} lg={6}>
          <Paper className={fixedHeightPaper}>
                Prueba 2
              </Paper>
          </Grid>
        </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Contenedor;
