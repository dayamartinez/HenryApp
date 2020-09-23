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
  }));


export function Settings(props){
    const classes = useStyles();
    const [state, setState]=useState({
        id: props.user.user.id,
        name: '',
        lastName:'',
        urlImage:'',
        portadaImage: ''
    });
 // para guardar el url en la tabla 
    const [urlImg, setUrlImg]= useState({
      id: props.user.user.id,
      urlImage: '',
      portadaImage: ''
    })
// estado para firebase storage
    const [image, setImage] = useState(null);

    const actualizarEstado = (e) => {
      setState({
          ...state,
          [e.target.name]: e.target.value,
      });
  };

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

      const handleChange = e => {
        if(e.target.files[0]){
          setImage(e.target.files[0]);
        }
      } 


// guarda la imagen en el localstorage de firebase
        const handleUpload = () => {
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          uploadTask.on(
              "state_changed",
              snapshot => { },
              error => {
              },
              () => {
                  storage
                      .ref("images")
                      .child(image.name)
                      .getDownloadURL()
                      .then(url => {
                          console.log("url")
                          console.log(url)
                          setUrlImg({
                            ...urlImg,
                            urlImage: url
                        })
                          props.updateUser(urlImg)
                        
                      })
              }
          )
      }  

      const handleUploadPortada = () => {
        const uploadTask = storage.ref(`images/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => { },
            error => {
            },
            () => {
                storage
                    .ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        console.log("url")
                        console.log(url)
                        setUrlImg({
                          ...urlImg,
                          portadaImage: url
                      })
                        props.updateUser(urlImg)
                      
                    })
            }
        )
       
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
                label="Update Name"
                autoFocus
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
        <Grid className={classes.profileImg}>
        <Typography component="h1" variant="h5">
                        Cambiar foto de perfil
                </Typography>
                <Typography >
                         <input 
                          class="input-group" 
                          color="primary"
                          type="file"
                          id="fileUpload"
                          className={classes.uploadImage}
                          onChange={handleChange}
                          />
                </Typography>
                <Button
                          className={classes.button}
                          color="primary" 
                          type="submit"
                          fullWidth
                          variant="contained" 
                          onClick={handleUpload}>
                            GuardarImagen
                 </Button>

                    </Grid>

                    <Grid className={classes.portadaImg}>
                    <Typography component="h1" variant="h5">
                        Cambiar foto de Portada
                </Typography>
                <Typography >
                         <input 
                          class="input-group" 
                          color="primary"
                          type="file"
                          id="fileUpload"
                          className={classes.uploadImage}
                          onChange={handleChange}
                          />
                </Typography>
                <Button
                          className={classes.button}
                          color="primary" 
                          type="submit"
                          fullWidth
                          variant="contained" 
                          onClick={handleUploadPortada}>
                            GuardarImagen
                 </Button>
                    </Grid>
                   
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