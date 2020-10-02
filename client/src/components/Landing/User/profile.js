import React,{useState, useEffect} from 'react';
import Avatar from '@material-ui/core/Avatar';
import fondo from '../../../images/FondoInfo.jpeg';
import henrylogo from '../../../images/soyhenry.jpeg';
import {AppBar, Toolbar, Typography, IconButton, Button, makeStyles} from '@material-ui/core';
import {connect} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import PublicIcon from '@material-ui/icons/Public';
import CakeIcon from '@material-ui/icons/Cake';
import EmailIcon from '@material-ui/icons/Email';
import CreateIcon from '@material-ui/icons/Create';
import { CohortDetail } from '../../CohortDetail/CohortDetail';
import {useHistory} from 'react-router-dom';
import Axios from 'axios';

//ESTILOS DE MATERIAL UI
const useStyles = makeStyles((theme) => ({
  totalBackground: {
    marginRight: '40px',
    marginLeft: '40px',
    background: '#f5f5f6',
    minHeight: '800px',
    maxHeight: '1000px'
  },
  background: {
    display: 'flex',
    flexDirection: 'column',
    background: 'black',
    alignItems: 'center',
    height: '200px'
  },
  profile: {
    position: 'absolute',
    width: '150px',
    height: '150px',
    marginTop: '120px',
    marginLeft: '-700px',
    borderRadius: '5px',
    borderColor: 'white',
    zIndex: '10px'
  },
  nameLastName: {
    textTransform: 'capitalize',
      display: 'flex',
      //position: 'absolute',
      justifyContent: 'center',
      marginTop: '25px',
      color: 'white'
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
     height: '400px',
     maxWidth: '1000px',
     display: "table-cell",
     width: "1000px",
     maxHeight: '600px'
  },
  container: {
    borderBottom: 'groove',
    background: 'rgba(0, 0, 0, 0.87)',
    marginTop: '-5px',
    height: '75px',
    },
    settingContainer: {
    display:'flex',
    position: 'absolute',
    left: '900px',
    marginTop: '-100px'
    },
    text: {
      display: 'flex',
      //position: 'absolute',
      justifyContent: 'center',
      marginTop: '25px',
      color: 'white',
      //marginLeft: '350 px',
      marginTop: '-5px',
      left: '250px',
      color: 'black',
      marginTop: '25px'
    },
    text2: {
      textTransform: 'capitalize',
      display: 'flex',
      color: 'black',
      marginLeft: '230px',
      marginTop: '-200px',
      color: "gray",
      fontSize: "18px",
    },
    text3: {
      display: 'flex',
      color: 'black',
      marginLeft: '230px',
      marginTop: '-200px',
      color: "gray",
      fontSize: "18px",
    },
    text4: {
      display: 'flex',
      color: 'black',
      marginLeft: '230px',
      color: "gray",
      fontSize: "18px",
    },
    tarjeta:{
      backgroundImage:`url(${fondo})`,
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      //alignItems: 'center',
       backgroundSize: "cover",
       marginTop: '35px',
       marginLeft: '130px',
       height: '400px',
       maxWidth: '1000px',
       display: "table-cell",
       width: "1000px",
       maxHeight: '600px',
       justifyContent: 'center'
    },
    container: {
      borderBottom: 'groove',
      background: 'rgba(0, 0, 0, 0.87)',
      marginTop: '-5px',
      height: '100px',
      },
      settingContainer: {
      display:'flex',
      position: 'absolute',
      left: '900px',
      marginTop: '-100px'
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
        display: 'flex',
        color: 'black',
        marginLeft: '230px',
        marginTop: '-200px',
        color: "gray",
        fontSize: "18px",
      },
      text3: {
        display: 'flex',
        color: 'black',
        marginLeft: '230px',
        marginTop: '-200px',
        color: "gray",
        fontSize: "18px",
      },
      text4: {
        display: 'flex',
        color: 'black',
        marginLeft: '230px',
        color: "gray",
        fontSize: "18px",
      },
      text5: {
        display: 'flex',
        color: 'black',
        marginLeft: '230px',
        color: "gray",
        fontSize: "18px",
      },
      textAbout: {
        position: 'absolute',
        left: '250px',
      },
      textBirthday: {
        position: 'absolute',
        left: '250px',
        color: 'black',
        marginTop: '100px'
      },
      text6: {
        display: 'flex',
        color: "black",
        marginLeft: '230px',
        color: "gray",
        fontSize: "18px",
      },
      portada: {
        display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxHeight: '220px',
      width: '100%',
      objectFit: 'cover',
      objectPosition:'center center'
      },
      informacion: {
        marginTop: '-500px',
        textAling: 'right',
        width: '600px',
        paddingTop: '-15px',
        borderRadius: '10px',
        height: '200px',
        marginTop: '80px',
        marginLeft: 'auto',
        transition: "0.6s",
        margin: "auto",
        boxShadow: "0 8px 40px -12px rgba(0,0,0,0.8)",
        flexDirection: 'column',
      },
      info:{
        display: 'flex',
        width: '50px',
        height: '300px'
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

  export function Profile({user, match}){
    useEffect(() => {
      if (match.params.id){
        Axios.get(`http://localhost:3001/user/user/${match.params.id}`)
        .then(user=>{
          setUserDetail(user.data);
        }) 
      }
      if (!user.user.cohortId){
        Axios.get(`http://localhost:3001/cohort/instructor/${user.user.id}`)
        .then(data=>{
          setCohortInstId(data.data.cohortId)
          console.log(data.data)
        })
        
      }
     // console.log(userDetail)
    },[]);
    
    const history = useHistory();
    const classes = useStyles();
    const [cohortInstId,setCohortInstId] = useState()
    const [userDetail, setUserDetail] = useState()
    // const [value, setValue] = React.useState(0);
    const [value,setValue] = useState(0)
    // const handleChange = (event, newValue) => {
    //   setValue(newValue);
    // };
    console.log(cohortInstId)
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
          <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
        <div  className={classes.background}> 
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
          {userDetail ? <img   className={classes.portada}  src= {userDetail.portadaImage}/>:<img   className={classes.portada}  src= {user.user.portadaImage}/>}
          {userDetail ? <Avatar  className={classes.profile} alt="Remy Sharp" src={userDetail.urlImage} />:<Avatar  className={classes.profile} alt="Remy Sharp" src={user.user.urlImage} />}
        </div>
        
        <div>
        </div>
        <div className={classes.container}>
           {userDetail ? <h2 className={classes.nameLastName}>{`${userDetail.name } ${userDetail.lastName}`} </h2>:<h2 className={classes.nameLastName}>{`${user.user.name } ${user.user.lastName}`} </h2>}
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
        
    {/* <div className={classes.settingContainer}>
      {userDetail ? null : <SettingButton />}
    </div> */}
    <div className={classes.settingContainer}>
      {userDetail ? null : <IconButton color="primary" onClick={(e) => history.push('/profile/Settings')}><CreateIcon/></IconButton>}
    </div>
    <div className={classes.barra}>
      <div>
      <Button variant='outline' color='primary' className={classes.boton} onClick={mostrarInfo}>
         Información
      </Button>
      </div>
      <div>
        {cohortInstId && <Button variant='outline' href={"/cohortDetail/"+cohortInstId} color='primary' className={classes.boton}>
          Ver Cohorte
          </Button>}
      </div>
    </div>
    <div>
         {value === 1 ?
           <Paper className={classes.tarjeta}>
           <Card className={classes.informacion}>
          <CardMedia ><img src={henrylogo} /></CardMedia>
           <CardContent > 
            {userDetail ? <p className={classes.text3}> <PublicIcon/> {`${userDetail.country + "," + " "+ userDetail.city }`}</p>:<p className={classes.text3}> <PublicIcon/> {`${user.user.country + "," + " "+ user.user.city }`}</p>}
            {userDetail ? <p className={classes.text4}> <CakeIcon />{`${userDetail.birthday.slice(0,10)}`}</p>:<p className={classes.text4}> <CakeIcon />{`${user.user.birthday.slice(0,10)}`}</p>}
            {userDetail ? <p className={classes.text5}> <i class="fa fa-rocket"></i> {`${userDetail.cohortId}`}</p>:<p className={classes.text5}> <i class="fa fa-rocket"></i> {`${user.user.cohortId}`}</p>}
            {userDetail ? <p className={classes.text6}> <EmailIcon/> {`${userDetail.email}`}</p>:<p className={classes.text6}> <EmailIcon/> {`${user.user.email}`}</p>}
           </CardContent> 
           </Card>
           </Paper>
        //  <Paper className={classes.tarjeta}>
        //  <div>
        //  <Typography variant="h5" gutterBottom> 
        //   <br></br>
        //   {userDetail ? <p className={classes.text2}>{`Pais de residencia: ${userDetail.country}`}</p>:<p className={classes.text2}>{`Pais de residencia: ${user.user.country}`}</p>}
        //   {userDetail ? <p className={classes.text3}>{`Estado/Provincia: ${userDetail.city}`}</p>:<p className={classes.text3}>{`Estado/Provincia: ${user.user.city}`}</p>}
        //   {userDetail ? <p className={classes.text4}>{`Fecha de nacimiento: ${userDetail.birthday.slice(0,10)}`}</p>:<p className={classes.text4}>{`Fecha de nacimiento: ${user.user.birthday.slice(0,10)}`}</p>}
        //   {userDetail ? <p className={classes.text5}>{`El cohorte al cual pertenece: ${userDetail.cohortId}`}</p>:<p className={classes.text5}>{`El cohorte al cual pertenece: ${user.user.cohortId}`}</p>}
        //   <br></br>
        //   {userDetail ? <p className={classes.text}>Email: {`${userDetail.email}`}</p>:<p className={classes.text}>Email: {`${user.user.email}`}</p>}
        //  </Typography> 
        //  </div>
        //  </Paper>
        :null}
       
    </div>
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
 