import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {getAllUsers} from '../../../actions/user.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import Link from '@material-ui/core/Link';
import UserCard from './userCards.js';
import { useHistory } from 'react-router-dom';
import {Redirect} from 'react-router';
import Axios from 'axios';

const useStyles = makeStyles((theme) => ({
    search: {
        display: 'flex',
        marginTop: 'auto',
    },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
          width: '300px',
          background: 'dimgray',
    
        },
    },
    searchIcon: {
        display: 'flex',
        position: 'absolute',
        marginLeft: '5px',
        zIndex: '10',
        marginTop: '-5px'
    },
    nameLastName: {
      display: 'flex',
      marginLeft: '10px',
      color: 'black'
    },
    allusers: {
      position: 'absolute',
      left: '0px'
    }
}));

export function SearchBar(props) {
    const classes = useStyles();
    const [state, setState] = useState([])
    const history = useHistory();
    let array;

    const getUsers = function (state) {
  
  //console.log(state)
  // history.push('/Home/search')
  //  await fetch(`http://localhost:3001/user/users/${state}`)
  //     .then((response) => response.json())
  //     .then(usuarios => {
       // console.log(usuarios);
           //   UserCard(usuarios)
              // history.push('/profile/search')
      //})
      // var array;
      Axios.get(`http://localhost:3001/user/users/${state}`)
      .then( async users=>{
      let user = users.data;
      props.getAllUsers(user); 
      

      })
      .catch(error => {
        return error;
      })
      history.push('/search')
}
    
  return (
    <div>
      
         <div className={classes.search}>
           <IconButton 
              className={classes.searchIcon}
              type="submit"
              onClick={()=>
                getUsers(state)}
           > 
              <SearchIcon />
           </IconButton>
            <InputBase
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
              }}
              value={state}
              onChange={(e) => setState(e.target.value)}
            />
          </div>  
       
       
    </div>
  );
}

const mapStateToProps = state => {
  return {
    user: state.user,
    usuario: state.usuario
  }
}
const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: (user) => dispatch(getAllUsers(user)),
  }
}
    
export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);  