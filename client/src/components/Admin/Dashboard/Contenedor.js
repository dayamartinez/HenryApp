import React from 'react';
import {makeStyles} from '@material-ui/core';
import BarraLateral from './BarraLateral';

const estilos = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  content:{
    //backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3)
  }
}))
const Contenedor = () => {

  const s = estilos();
  return(
    <div className={s.root}>
      <BarraLateral/>
        <div className={s.content}>
          contenido
        </div>
    </div>
  )
}

export default Contenedor;
