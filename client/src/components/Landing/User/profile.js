import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles, unstable_createMuiStrictModeTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import SettingButton from './SettingButton.js'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';

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
      alignItems: 'center',
      background: 'black',
      height: '250px'
    },
    profile: {
      display: 'flex',
      width: '150px',
      height: '150px',
      marginTop: '200px',
      marginLeft: '-700px',
      borderRadius: '5px',
      zIndex: '10px'
    },
    nameLastName: {
      display: 'flex',
      position: 'absolute',
      marginTop: '-5px',
      marginLeft: '200px',
    },
    container: {
      borderBottom: 'groove',
      background: '#f5f5f5',
      marginTop: '-18px',
      height: '150px',
      },
      settingContainer: {
        display:'flex',
      position: 'absolute',
      left: '900px',
      marginTop: '-140px'
      },
      text: {
        position: 'absolute',
        left: '250px',
        color: 'darkgray',
        marginTop: '25px'
      },
      textAbout: {
        position: 'absolute',
        left: '250px',
        color: 'darkgray',
        marginTop: '50px'
      },
      
  }));


  export function Profile(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    return(
        <div className={classes.totalBackground}>

        <div className={classes.background}> 
          <Avatar  className={classes.profile} alt="Remy Sharp" src={HenryIcon} />
        </div>
        <div className={classes.container}>
           <h2 className={classes.nameLastName}>Nombre Apellido </h2>
        <Typography variant="subtitle1" gutterBottom> 
         <p className={classes.text}>email@gmail.com</p>
         </Typography> 
         <Typography variant="body1" gutterBottom> 
         <p className={classes.textAbout}>About</p>
         </Typography> 
         <Typography variant="body1" gutterBottom className={classes.textAbout}> 
         <p><CalendarTodayIcon />Fecha de nacimiento</p>
         </Typography>
        </div>
        
    <div className={classes.settingContainer}>
      <SettingButton />
    </div>
        
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Posts" />
        <Tab label="Interacciones" />
        <Tab label="Biblioteca" />
        <Tab label="Información" />
      </Tabs>
    </Paper>
        </div>
    )
  }


  export default Profile;