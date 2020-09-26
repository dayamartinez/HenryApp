import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import {updateUser} from '../../../actions/user.js';
import { storage } from '../../../firebase/index.js';
import Menu from './SettingMenu';
import Avatar from '@material-ui/core/Avatar';
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
    background: {
      display: 'flex',
      background: `url(${fondo})`,
      height: '700px',
      width: '800px'
    },
  }));


const PortadaChange = (props) => {
    const classes = useStyles();
    
    const [portada, setPortada]= useState('')
      const [urlP, setUrlP]= useState({
        id: props.user.user.id,
        portadaImage: '',
        urlImage: ''
      })
  // estado para firebase storage
      const [imagen, setImagen] = useState(null);
  
  
        const handleChange = e => {
          if(e.target.files[0]){
            setImagen(e.target.files[0]);
          }
        } 
  


  const handleUploadPortada = () => {
    const uploadTask = storage.ref(`images/${imagen.name}`).put(imagen);
    uploadTask.on(
        "state_changed",
        snapshot => { },
        error => {
        },
        () => {
            storage
                .ref("images")
                .child(imagen.name)
                .getDownloadURL()
                .then( portada => {
                   
                    setPortada(portada)
                
                })
        }
    )
   
}  

const saveImage = function(){
    if (portada === ''){
      alert("Se debe completar alguno de los cambios!")
    } 
     if(portada){
       setUrlP({
         ...urlP,
         portadaImage: portada,
         urlImage: props.user.user.urlImage
       })

        props.updateUser(urlP)
        console.log(urlP)
      }
  }

   
    return (
        <Container className={classes.background}>
      <Container component="main" maxWidth="xs">
        <Grid className={classes.portadaImg}>
            <Menu/>
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
                <img src={portada || "http://via.placeholder.com/800x220"}/>
                <Button
                          className={classes.button}
                          color="primary" 
                          type="submit"
                          fullWidth
                          variant="contained" 
                          onClick={handleUploadPortada}>
                            Ver Foto
                 </Button>
                    </Grid>
                    <Button    
                    color="primary" 
                    type="submit"
                    fullWidth
                    variant="contained"
                    type="submit"onClick={()=> saveImage()}>Guardar Cambios</Button>
            </Container>
            </Container>
    )
};

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
      
  export default connect(mapStateToProps, mapDispatchToProps)(PortadaChange);