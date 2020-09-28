import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Menu from './SettingMenu'
import fondo from '../../../images/Fondo.png'

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
  background: {
      display: 'flex',
      background: `url(${fondo})`,
      height: '500px',
      width: '100%'
    },
 

  }));



export default function SettingsSection(){
    const classes = useStyles();

    return(
        <div >
            <Container className={classes.background}>
            <p>Configuracion</p>
            </Container>
            <Menu/>
        </div>
    );
}