import React from 'react';
import {makeStyles, Drawer, List} from '@material-ui/core';
import {mainListItems} from '../listItems';

const estilos = makeStyles(theme => ({
  drawer:{
    width: 240,
    flexShrink: 0,
    zIndex: -1
  },
  drawerPaper: {
    width:240,
  },
  toolbar: theme.mixins.toolbar

}))

const BarraLateral = () => {

  const s = estilos()

  return (
    <Drawer className={s.drawer} variant='permanent'
      classes={{
        paper: s.drawerPaper,
      }}
    >
      <div className={s.toolbar}></div>
      <List>{mainListItems}</List>
    </Drawer>
  )
}

export default BarraLateral;
