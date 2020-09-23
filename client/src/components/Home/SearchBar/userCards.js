import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import Link from '@material-ui/core/Link';
import {connect} from 'react-redux';

const useStyles = makeStyles((theme) => ({
    nameLastName: {
      display: 'flex',
      marginLeft: '10px',
      color: 'black'
    }
}));


export function UserCard(props){
    const classes = useStyles();
    //usuarios.map(item=>console.log(item))

    return (
      <div>
         
       
            {props.user.usuario[0] && props.user.usuario.map((item) =>
            <List >
            <ListItem >
            <Avatar key={item.id} alt="Remy Sharp" src={HenryIcon} />
            <Typography  
                  component="span"
                  variant="body2"
                className={classes.nameLastName}
                  >
            <Link color="black" href={`/profile/${item.id}`}>
              {item.name + ' ' + item.lastName}
              </Link>
            </Typography>
            </ListItem>
            <Divider variant="inset" component="li" />
            </List>
            )
            }
        
      </div>
    )

    // return(
    //   <List> 
    //         {usuarios.map(UsuarioEncontrado => (
             
                
    //           <div key={UsuarioEncontrado.id}>
    //              {console.log(UsuarioEncontrado)}
    //              <p>hola</p> 
                 
                 
    //             <ListItem alignItems="flex-start" >
    //               <Avatar alt="Remy Sharp" src={HenryIcon} />
                 
    //               <Typography  
    //               component="span"
    //               variant="body2"
    //             // className={classes.nameLastName)
    //               >
    //               <Link color="black" href={`/profile/${UsuarioEncontrado.id}`}>
    //               {UsuarioEncontrado.name + " " + UsuarioEncontrado.lastName}
    //                </Link>
    //               </Typography>
    //             </ListItem>
    //             <Divider variant="inset" component="li" />
             
    //           {console.log('Usdfsdfs')}
    //           </div>
                
    //         )
    //         )
    //         }
    //     </List>
    // );
  }

  const mapStateToProps = state => {		
    return {
      user: state.user,		
      usuario: state.usuario,
    }		
  }
      
  export default connect(mapStateToProps)(UserCard);  