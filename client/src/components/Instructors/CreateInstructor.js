import { makeStyles } from '@material-ui/core/styles';
import React,{useEffect, useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import HenryIcon from '../../images/henryUserIcon.jpg';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
//import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
//import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {userLogout} from '../../actions/user.js';
//import {setRedirect, setRedirectOff} from '../../actions/global'
import {connect} from 'react-redux';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { createStaffMember } from '../../actions/instructor';
import fondo from "../../images/Fondo.png"

const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      marginTop: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
      marginLeft: "140px"
    },
 
    title: {
        marginLeft: "150px",
        margin: theme.spacing(1),
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginLeft: "150px",
      marginBottom: "50px",
    },
    formControl:{
      width: '100%',
    },
    birthday: {
      width: '100%'
    },
    background: {
        backgroundImage:`url(${fondo})` ,
    },
    input: {
        background: "white"
    }
  }));

export function CreateStaff(props) {
    const classes = useStyles();
    const history = useHistory();

    const [staff, setStaff]= useState({
        email: '',
        password: '',
        name:'',
        lastName:'',
        birthday: '',
        country:'',
        city:'',
        profile: '',
        urlImage: HenryIcon,
    })

    //MANEJO DE ONCHANGE()
    const handleInputChange = function(e) {
        setStaff({
          ...staff,
          [e.target.name]:e.target.value
        })
      }

console.log(props)

console.log('hola')

console.log(createStaffMember())

      const onSend = function(e){
        e.preventDefault();
        console.log(staff)
        //SE VALIDAN TODOS LOS CAMPOS PARA MANDAR AL BACK!
        if (!staff.name || !staff.lastName || !staff.email  || !staff.password  || !staff.profile  || !staff.birthday || !staff.country || !staff.city){
          alert("Se deben completar todos los campos!")
          return;
        } else {
          //SI TODO ESTA OK-> MANDA LOS DATOS!
          console.log(props)
          console.log('hola')
          console.log(staff)
          props.createStaffMember(staff)
          return history.push('/admin');
        }
      
      }

    return (
        <div className={classes.background}>
             <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography className={classes.title} component="h1" variant="h5">
            Registrar Personal
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  //error={errors.name}
                  //error={input.name.length===0 ? true : false}
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  required
                  className={classes.input}
                 // helperText={errors.name}
                  fullWidth
                  //helperText={false ? "Este campo es requerido" : null}
                  id="firstName"
                  label="Nombre/s"
                  autoFocus
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //error={errors.lastName}
                  //helperText={errors.lastName}
                  variant="outlined"
                  required
                  className={classes.input}
                  fullWidth
                  id="lastName"
                  label="Apellido/s"
                  name="lastName"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //error={errors.lastName}
                  //helperText={errors.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.input}
                  id="email"
                  label="email"
                  name="email"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  //error={errors.lastName}
                  //helperText={errors.lastName}
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.input}
                  type="password"
                  id="password"
                  label="password"
                  name="password"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
              <Grid  item xs={12} className={classes.birthday}>
                <TextField
                  defaultValue="2017-05-24"
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.input}
                  id="date"
                  type="date"
                  label="birthday"
                  name="birthday"
                  autoComplete="off"
                  onChange={(e) => handleInputChange(e)}
                />
              </Grid>
   
              <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Pais</InputLabel>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}
                  onChange={(e) => handleInputChange(e)}
                  label="country"
                  inputProps={{
                    name: 'country',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option >Argentina</option>
                  <option >Uruguay</option>
                  <option >Colombia</option>
                  <option >Chile</option>
                  <option >Peru</option>
                  <option >Venezuela</option>
                  <option >Paraguay</option>
                  <option >Ecuador</option>
                </Select>
               </FormControl>
                
              </Grid>
              <Grid item xs={12}>
              <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Elegir rol</InputLabel>
                <Select
                  native
                  // value={state.age}
                  // onChange={handleChange}
                  onChange={(e) => handleInputChange(e)}
                  label="Rol"
                  inputProps={{
                    name: 'profile',
                    id: 'outlined-age-native-simple',
                  }}
                >
                  <option aria-label="None" value="" />
                  <option >instructor</option>
                  <option >founder</option>
                  <option >henryStaff</option>
                </Select>
               </FormControl>
                
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="city"
                  label="Ciudad/Provincia/Departamento"
                  id="city"
                  autoComplete="off"
                  className={classes.input}
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
               onClick={(e)=>onSend(e, staff)}
            >
              Registrar
            </Button>
          </form>
        </div>
      </Container>
        </div>
    )
}


const mapStateToProps = state => {		
    return {		
     staff: state.instructor.staff,
    }		
  }
  
  const mapDispatchToProps = dispatch => {
    return {
      createStaffMember: (staff)=> dispatch(createStaffMember(staff)),
      userLogout:()=>dispatch(userLogout()),
    }
  }
      
  export default connect(mapStateToProps, mapDispatchToProps)(CreateStaff);