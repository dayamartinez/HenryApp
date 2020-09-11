import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {updateUser} from '../../../actions/user.js';

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
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));


export function Settings(props){
    const classes = useStyles();
    const [state, setState]=useState({
        name:'',
        lastName:'',
        email:'',
    });
 

    const [password, setPassword]= useState({
        newPassword: '',
        confirmNewPassword: ''
    })


    const onSend = function(e){
        e.preventDefault();
        props.updateUser(state)
      }
  
      //MANEJO DE ONCHANGE()
      const handleInputChange = function(e) {
          setState({
            ...state,
            [e.target.name]:e.target.value
          })
        }

    return (
        <Container component="main" maxWidth="xs">
                <div className={classes.paper}>
                <Typography component="h1" variant="h5">
                        Configuración
                </Typography>
                <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
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
            className={classes.submit}
            onClick={(e)=>onSend(e)}
          >
            Guardar cambios
          </Button>
         
        </form>


                </div>
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