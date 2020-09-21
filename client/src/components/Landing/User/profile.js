import React,{useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import SettingButton from './SettingButton.js'
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import ProfilePicChange from './passwordSetting';

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
      //position: 'absolute',
      justifyContent: 'center',
      marginTop: '-5px',
      //marginLeft: '350 px',
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
        display: 'flex',
        //position: 'absolute',
        justifyContent: 'center',
        marginTop: '-5px',
        left: '250px',
        color: 'darkgray',
        marginTop: '25px'
      },
      textAbout: {
        position: 'absolute',
        left: '250px',
        marginTop: '50px'
      },
      textBirthday: {
        position: 'absolute',
        left: '250px',
        color: 'darkgray',
        marginTop: '100px'
      },
  }));
  
  export function Profile(props){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const mostrarDatos = function(e){

    }
    return(
        <div className={classes.totalBackground}>

        <div className={classes.background}> 
          <Avatar  className={classes.profile} alt="Remy Sharp" src={HenryIcon} />
        </div>
        <div>
        <ProfilePicChange/>
        </div>
        <div className={classes.container}>
           <h2 className={classes.nameLastName}>{`${props.user.user.name } ${props.user.user.lastName}`} </h2>
        <Typography variant="subtitle1" gutterBottom> 
          <p className={classes.text}>{`${props.user.user.email}`}</p>
         </Typography> 
         
         {/* <Typography variant="body1" gutterBottom> 
         <article className={classes.textAbout}>About</article>
         </Typography> */}
        
         <Typography variant="body1" gutterBottom className={classes.textBirthday}> 
         <p><CalendarTodayIcon />{props.user.user.birthday}</p>
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
        <Tab label="Biblioteca"  />  
        <Tab label="Información" />
      </Tabs>
    </Paper>
        </div>
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