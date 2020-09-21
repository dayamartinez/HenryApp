import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {updateUser} from '../../../actions/user.js';
import { storage } from '../../../firebase/index.js'

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
        id: props.user.user.id,
        name: '',
        lastName:'',
        urlImage: ''
    });
 

    const [image, setImage] = useState({
      id: props.user.user.id,
      profileImage: ''
  });


    const onSend = function(e){
        e.preventDefault();
        if (!state.name && !state.lastName){
          alert("Se debe completar alguno de los cambios!")
          return;
        } 
          if(!state.name && state.lastName){
            state.name = props.user.user.name;
          }
        
          if(!state.lastName && state.name){
            state.lastName = props.user.user.lastName;
          } else{
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



        const handleUpload = () => {
          const uploadTask = storage.ref(`images/${image.id}`).put(image);
          uploadTask.on(
              "state_changed",
              snapshot => { },
              error => {
              },
              () => {
                  storage
                      .ref("images")
                      .child(image.id)
                      .getDownloadURL()
                      .then(url => {
                          console.log("url")
                          console.log(url)
                          setState({
                              ...state,
                              profileImage: url
                          })
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
            className={classes.submit}
            onClick={(e)=>onSend(e)}
          >
            Guardar cambios
          </Button>
         
        </form>

        <Grid className="custom-file">
                        <Grid 
                            type="file" class="custom-file-input" id="customFileLang" lang="es"
                            onChange={e => setImage(e.target.files[0])}
                        /> <br /><br />
                        <label class="custom-file-label" for="customFileLang" lang="es">Seleccionar Archivo</label>
                        <Button
                          className={classes.submit}
                          color="primary" 
                          type="submit"
                          fullWidth
                          variant="contained" 
                          onClick={handleUpload}>
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