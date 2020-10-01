import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {updateUser} from '../../../actions/user.js';
import { storage } from '../../../firebase/index.js';
import Divider from '@material-ui/core/Divider';
import Menu from './SettingMenu'
import fondo from '../../../images/Fondo.png'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '500px', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      height: '200px',
      paddingTop: '20px',
    },
    submit: {
      margin: theme.spacing(3, 0, 2, 6, 10),
    },
    profileImg: {
      marginTop: "50px"
    },
    portadaImg: {
      marginTop: "50px",
      marginBottom: "50px"
    },
    button: {
      marginTop: "20px"
    },
    background: {
      display: 'flex',
      background: `url(${fondo})`,
      height: '900px',
      width: '800px'
    },
    input: {
      background: 'white'
    }
  }));


export function Settings(props){
    const classes = useStyles();
    const [state, setState]=useState({
        id: props.user.user.id,
        rol: props.user.user.rol,
        name: '',
        lastName:''
    });

    const onSend = function(e){
        e.preventDefault();
        if (!state.name && !state.lastName){
          alert("Se debe completar alguno de los cambios!")
        } 
          if(!state.name && state.lastName){
            state.name = props.user.user.name;
            props.updateUser(state)
          }
        
          if(!state.lastName && state.name){
            state.lastName = props.user.user.lastName;
            props.updateUser(state)
          } 
          if(state.lastName && state.name){
            props.updateUser(state)
          }
      }
  
    
      //MANEJO DE ONCHANGE()
      const handleInputChange = function(e) {
          setState({
            ...state,
            [e.target.name]:e.target.value
          })
        }

   
    return (
      <Container className={classes.background}>
        <Container  maxWidth="xs" >
          <Menu/>
                <div className={classes.paper}>
                <form className={classes.form} noValidate >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Update Name"
                autoFocus
                className={classes.input}
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="flastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label=" Update LastName"
                name="lastName"
                className={classes.input}
                autoComplete="lname"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            onClick={(e)=>onSend(e)}
          >
            Guardar cambios
          </Button>
         
          </form>
                   
                </div>
            </Container>
            </Container>
    )
}

const mapStateToProps = state => {		
    return {		
      user: state.user,
    }		
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      updateUser: (state)=>dispatch(updateUser(state)),
    }
  }
      
  export default connect(mapStateToProps, mapDispatchToProps)(Settings);