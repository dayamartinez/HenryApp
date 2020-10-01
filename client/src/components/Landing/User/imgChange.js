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
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    paper2:{
      width: '150px',
      height: '150px'
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
      marginTop: "50px",
      marginBottom: "50px"
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
    const [urlImg, setUrlImg]= useState('')
// estado para firebase storage
    const [image, setImage] = useState(null);

// guardar en tabla
    const [img, setImg] = useState({
      id: props.user.user.id,
      rol: props.user.user.rol,
      urlImage: '',
      // portadaImage: ''
    })
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
                      .then(urlImg => {
                         
                          setImg({
                            urlImage: urlImg
                          })
                          
                      })
              }
          )
      }  



    const saveImage = function(){
      if (!img.urlImage){
        alert("Se debe completar alguno de los cambios!")
      } 
       if(img.urlImage){
         var data = {
          id: props.user.user.id,
          rol: props.user.user.rol,
          urlImage: img.urlImage
        }
        props.updateUser(data)
        }
    }

    return (
      <Container className={classes.background}>
        <Container component="main" maxWidth="xs" >
          <Menu/>
                
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
                <img className={classes.paper2} src={img.urlImage || "http://via.placeholder.com/150x150"}/>

                <Button
                          className={classes.button}
                          color="primary" 
                          type="submit"
                          fullWidth
                          variant="contained" 
                          onClick={handleUpload}>
                            Ver foto
                 </Button>

                    </Grid>

                   <Button
                    color="primary" 
                    type="submit"
                    fullWidth
                    variant="contained"
                    type="submit"
                     onClick={()=> saveImage(img)}>
                       Guardar Cambios
                       </Button>
               
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