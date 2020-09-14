import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {addUser} from '../../actions/user.js';
import {connect} from 'react-redux';
// import { useHistory } from 'react-router-dom';
/*

este es el inicio de sesion, los pedazos de codigo comentados(linea 11 y 65-67) me tiraban error

*/

//ESTILOS DE MATERIAL UI
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


export function Register(props) {
  
    const classes = useStyles();
    const [input,setInput]=useState({
        name:'',
        lastName:'',
        email:'',
        password:'',
        confirmPassword: ''
    });

    const onSend = function(e){
      e.preventDefault();
      props.addUser(input)
    
    }

    //MANEJO DE ONCHANGE()
    const handleInputChange = function(e) {
        setInput({
          ...input,
          [e.target.name]:e.target.value
        })
        setErrors(validate({
          ...input,
          [e.target.name]: e.target.value,
        }));
      }

      const [errors, setErrors] = useState({});

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                // error={errors.name}
                //error={input.name.length===0 ? true : false}
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                // helperText={errors.name}
                fullWidth
                //helperText={false ? "Este campo es requerido" : null}
                id="firstName"
                label="First Name"
                autoFocus
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                error={errors.lastName}
                helperText={errors.lastName}
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
            <Grid item xs={12}>
              <TextField
                error={errors.email}
                helperText={errors.email}
               // error={!/\S+@\S+\.\S+/.test(input.email) ? true : false}
                //helperText={true ? "Debe ser un mail valido" : null}
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                error={errors.password}
                helperText={errors.password}
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label="I want to receive inspiration, marketing promotions and updates via email."
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
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={5}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

const mapStateToProps = state => {		
  return {		
    user: state.user,
  }		
}

const mapDispatchToProps = dispatch => {
  return {
    addUser: (input)=>dispatch(addUser(input)),
  }
}
    
export function validate(input) {
  let errors = {};
 if(!input.name){
   errors.name= 'Por favor introduzca su nombre'
 }
 if(!input.lastName){
  errors.lastName= 'Por favor introduzca su apellido'
}
  if (!input.email) {
    errors.email = 'Por favor introduzca su email';
  } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    errors.email = 'El email es invalido';
  }
if(!input.password){
  errors.password = 'Por favor introduzca su contraseña';
} else if (!/([A-Za-z][A-Za-z0-9]*[0-9][A-Za-z0-9])/.test(input.password)) {
  errors.password = 'La contraseña debe contener una letra mayuscula y al menos dos numeros';

  }else if(input.password !== input.confirmPassword){
  errors.password= "Las contraseñas no coinciden"
}
  return errors;
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);