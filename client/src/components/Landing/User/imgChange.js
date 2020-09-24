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


export function Settings(props){
    const classes = useStyles();
    

   
 // para guardar el url en la tabla 
    const [urlImg, setUrlImg]= useState({
      id: props.user.user.id,
      urlImage: '',
      portadaImage: ''
    })
// estado para firebase storage
    const [image, setImage] = useState(null);


      const handleChange = e => {
        if(e.target.files[0]){
          setImage(e.target.files[0]);
        }
      } 


// guarda la imagen en el localstorage de firebase
        const handleUpload = () => {
          console.log(image)
          console.log('hhhh')
          const uploadTask = storage.ref(`images/${image.name}`).put(image);
          console.log(image.name)
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
                        
                       console.log(urlImg)
                       console.log('h')
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
                    .then( url => {
                        console.log("url")
                        console.log(url)
                        setUrlImg({
                          ...urlImg,
                          portadaImage: url
                      })
                        
                    })
            }
        )
       
    }  

    const saveImage = function(){
      if (!urlImg.portadaImage && !urlImg.urlImage){
        alert("Se debe completar alguno de los cambios!")
      } 
        if(!urlImg.portadaImage && urlImg.urlImage){
          urlImg.portadaImage = props.user.user.portadaImage;
          props.updateUser(urlImg)
        }
      
        if(urlImg.portadaImage && !urlImg.urlImage){
          urlImg.urlImage = props.user.user.urlImage;
          props.updateUser(urlImg)
        } 
        if(urlImg.portadaImage && urlImg.urlImage){
          props.updateUser(urlImg)
        }
    }

    return (
      <Container className={classes.background}>
        <Container component="main" maxWidth="xs" >
          <Menu/>
                <div className={classes.paper}>
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
                   <Button
                    color="primary" 
                    type="submit"
                    fullWidth
                    variant="contained"
                    type="submit"
                     onClick={()=> saveImage()}>
                       Guardar Cambios
                       </Button>
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