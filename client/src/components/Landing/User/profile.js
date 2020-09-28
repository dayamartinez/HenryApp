import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import fondo from '../../../images/FondoInfo.jpeg'
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import Button from '@material-ui/core/Button';
import SettingButton from './SettingButton.js'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { CardMedia } from '@material-ui/core';
import { Card } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { CohortDetail } from '../../CohortDetail/CohortDetail';

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
    totalBackground: {
      marginRight: '40px',
      marginLeft: '40px',
      background: '#f5f5f6',
      height: '1000px'
    },
    background: {
      display: 'flex',
      flexDirection: 'column',
      background: 'black',
      alignItems: 'center',
      height: '220px'
    },
    profile: {
      position: 'absolute',
      width: '150px',
      height: '150px',
      marginTop: '150px',
      marginLeft: '-700px',
      borderRadius: '5px',
      borderColor: 'white',
      zIndex: '10px'
    },
    nameLastName: {
      display: 'flex',
      //position: 'absolute',
      justifyContent: 'center',
      marginTop: '-5px',
      //marginLeft: '350 px',
    },
    barra: {
      background: '#212121',
      display: 'flex',
      height: '50px',
      justifyContent: 'space-around',
    },
    boton:{
      color: '#fdd835'
    },
    tarjeta:{
      backgroundImage:`url(${fondo})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      //alignItems: 'center',
       backgroundSize: "cover",
       marginTop: '35px',
       marginLeft: '130px',
       height: '500px',
       maxWidth: '1000px'
    },
    container: {
      borderBottom: 'groove',
      background: '#f5f5f5',
      marginTop: '-5px',
      height: '100px',
      },
      settingContainer: {
      display:'flex',
      position: 'absolute',
      left: '900px',
      marginTop: '-140px'
      },
      text: {
        display: 'flex',
        //position: 'absolute',
        justifyContent: 'center',
        marginTop: '-5px',
        left: '250px',
        color: 'black',
        marginTop: '25px'
      },
      text2: {
        marginTop: '40px',
        marginLeft: '140px',
        color: 'black',
        
      },
      text3: {
        marginTop: '40px',
        marginLeft: '190px',
        color: 'black',
        
      },
      text4: {
        marginTop: '40px',
        marginLeft: '230px',
        color: 'black',
        
      },
      text5: {
        marginTop: '40px',
        marginLeft: '270px',
        color: 'black',
        
      },
      textAbout: {
        position: 'absolute',
        left: '250px',
        marginTop: '50px'
      },
      textBirthday: {
        position: 'absolute',
        left: '250px',
        color: 'black',
        marginTop: '100px'
      },
      portada: {
        display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '220px',
      width: '100%',
      objectFit: 'cover',
      objectPosition:'center center'
      }
  }));
  
  // function TabPanel(porps) {
  //   const { children, value, index, ...other } = porps;
  
  //   return (
  //     <div
  //       role="tabpanel"
  //       hidden={value !== index}
  //       id={`simple-tabpanel-${index}`}
  //       aria-labelledby={`simple-tab-${index}`}
  //       {...other}
  //     >
  //       {value === index && (
  //         <Box p={3}>
  //           <Typography>{children}</Typography>
  //         </Box>
  //       )}
  //     </div>
  //   );
  // }
  
  // TabPanel.propTypes = {
  //   children: PropTypes.node,
  //   index: PropTypes.any.isRequired,
  //   value: PropTypes.any.isRequired,
  // };
  
  // function a11yProps(index) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     'aria-controls': `simple-tabpanel-${index}`,
  //   };
  // }

  export function Profile(props){
    const classes = useStyles();
    // const [value, setValue] = React.useState(0);
    const [value,setValue] = useState(0)
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    const mostrarInfo = ()=>{
      setValue(1)
      
    }
    const mostrarPost = () =>{
      setValue(2)
    }
    const mostrarCohorte = () =>{
      setValue(3)
    }
    return(
        <Card className={classes.totalBackground} >
        <div  className={classes.background}> 
          <img   className={classes.portada}  src= {props.user.user.portadaImage}/>
          <Avatar  className={classes.profile} alt="Remy Sharp" src={props.user.user.urlImage} />
        </div>
        
        <div>
        </div>
        <div className={classes.container}>
           <h2 className={classes.nameLastName}>{`${props.user.user.name } ${props.user.user.lastName}`} </h2>
        {/* <Typography variant="subtitle1" gutterBottom> 
          <p className={classes.text}>{`${props.user.user.email}`}</p>
         </Typography> 
          */}
         {/* <Typography variant="body1" gutterBottom> 
         <article className={classes.textAbout}>About</article>
         </Typography> */}
        
         <Typography variant="body1" gutterBottom className={classes.textBirthday}> 
         </Typography>
        </div>
        
    <div className={classes.settingContainer}>
      <SettingButton />
    </div>
    <div className={classes.barra}>
      <div>
      <Button variant='outline' color='primary' className={classes.boton} onClick={mostrarInfo}>
         Información
      </Button>
      </div>
      <div>
      <Button variant='outline' color='primary' className={classes.boton} onClick={mostrarPost}>
         Posts
      </Button>
      </div>
      <div>
        <Button variant='outline' color='primary'  href={"/cohortDetail/"+props.user.user.cohortId} className={classes.boton}>
            Ver mi cohorte
        </Button>
      </div>
    </div>
    <div>
         {value === 1 ?
         <Paper className={classes.tarjeta}>
         <div>
         <Typography variant="h5" gutterBottom> 
          <br></br>
          <p className={classes.text2}>{`Pais de residencia: ${props.user.user.country}`}</p>
          <p className={classes.text3}>{`Estado/Provincia: ${props.user.user.city}`}</p>
          <p className={classes.text4}>{`Fecha de nacimiento: ${props.user.user.birthday.slice(0,10)}`}</p>
          <p className={classes.text5}>{`El cohorte al cual pertenece: ${props.user.user.cohortId}`}</p>
          <br></br>
          <p className={classes.text}>Email: {`${props.user.user.email}`}</p>
         </Typography> 
         </div>
         </Paper>
        :null}
        {value === 2?
        <Typography variant="subtitle1" gutterBottom> 
        <p className={classes.text}>La clase de autenticacion se paso para el dia 22/09</p>
        <br></br>
        <p className={classes.text}>La fecha del checkpoint es el viernes 25/09</p>
        <br></br>
        <p className={classes.text}>Faltan los github de Rodrigo Villaruel, Sofia Lagos y Matias Galvan</p>
       </Typography> 
        :null}
        {value === 3 ?<CohortDetail/>:null}
    </div>
    {/* <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Posts" {...a11yProps(0)}/>
        <Tab label="Interacciones" {...a11yProps(1)}/>
        <Tab label="Biblioteca" {...a11yProps(2)} />  
        <Tab label="Información" {...a11yProps(3)}/>
      </Tabs>
      <TabPanel value={value}>
        <spand>ASDASDASDASDA</spand>
      </TabPanel>
    </Paper> */}
        </Card>
    )
  }
  const mapStateToProps = state => {		
    return {		
      user: state.user,
    }		
  }
  
  // const mapDispatchToProps = dispatch => {
  //   return {
  //     setUser: (resp)=>dispatch(setUser(resp)),
  //   }
  // }
      
  export default connect(mapStateToProps)(Profile); 

  // export default Profile;
 