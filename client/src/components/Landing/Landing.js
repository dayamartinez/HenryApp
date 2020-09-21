import React from 'react';
import Login from "./Login.js" 
import {makeStyles, Grid, Container} from '@material-ui/core';
import clsx from 'clsx';
import fondo from "../../images/Fondo.png"
const useStyles = makeStyles((theme) => ({
  fondo:{
   backgroundImage:`url(${fondo})` ,
   backgroundPosition: "center",
   backgroundRepeat: "no-repeat",
   backgroundSize: "cover",
   height: "100vh",
  },
  titleBack:{
    top:25,
    backgroundColor: theme.palette.primary.main,
    height: 25,
    position:"relative",
    zIndex:0,
    width:340,
  },
  title:{
    // backgroundColor: theme.palette.primary.main,<h1>Ingrese su email con el que aplico.</h1>
    zIndex:1,
    position:"relative",
    top:-20,
    left:30,
  }
}))

export  default function Landing() {
  const s = useStyles();
  const fixedHeightChart = clsx(s.paper, s.fixedHeightChart);

return (
  <div className={s.fondo}>
    <Container>
      <Grid>
        <Grid item className={s.elemento} xs={12}>
          <div className={s.titleBack}>
            <h2 className= {s.title} >
              Bienvenido a HenryApp
            </h2>
          </div>
          
        </Grid>
        
        {/* llamo al componente Login importado */}
        <Grid item xs={12}>
          <Login/>
        </Grid>
      </Grid>
    </Container>
  </div>
)
}