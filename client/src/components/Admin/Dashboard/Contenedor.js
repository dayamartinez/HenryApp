import React from 'react';
import {makeStyles, Grid, Paper, Container, Button, Divider} from '@material-ui/core';
import Chart from './Chart';
import Title from './Title'; 
import clsx from 'clsx';

const estilos = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    height: '100vh',
  },
  content:{
    padding: theme.spacing(2),
    marginLeft: 240,
    width: '100%'
  },
  container: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(4),
    marginRight: theme.spacing(4)
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    margin:theme.spacing(1),
    marginBottom: theme.spacing(5),
  },
  fixedHeightChart: {
    height: 300,
  },

  divider: {
    margin: `${theme.spacing.unit * 2}px 0`,
  },
  toolbar: theme.mixins.toolbar
}))
const Contenedor = () => {

  const s = estilos();
  const fixedHeightChart = clsx(s.paper, s.fixedHeightChart);
  const fixedHeightPaper = clsx(s.paper);
  return(
    <div className={s.root}>
      <div className={s.toolbar}></div>
      <div className={s.content}>
      <Container maxWidth="lg" className={s.container}> 
      
      <Grid container spacing={24}>
        <Grid item xs={3}>
          <Button className={fixedHeightPaper} variant='contained' color='primary' fullWidth>
            <Title>Alumnos</Title>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button className={fixedHeightPaper} variant='contained' color='primary'fullWidth>
            <Title>Alumnos contratados</Title>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button className={fixedHeightPaper} variant='contained' color='primary'fullWidth>
            <Title>Grupos</Title>
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button className={fixedHeightPaper} variant='contained' color='primary'fullWidth>
            <Title>Pair Programming</Title>
          </Button>
        </Grid>
        <Grid item xs={9}>
          <Paper className={fixedHeightChart}>
            <Chart />
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={fixedHeightChart}>
            <Title>RANGO DE TIEMPO</Title>
            <Divider className={s.divider} />
            <Button variant='outlined' fullWidth> Diario </Button>
            <Divider className={s.divider} />
            <Button variant='outlined' fullWidth> Mensual </Button>
            <Divider className={s.divider} />
            <Button variant='outlined' fullWidth> Anual </Button>
          </Paper>
        </Grid>
      </Grid>
        </Container>
      </div>
    </div>
  )
}

export default Contenedor;
