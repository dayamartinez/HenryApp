import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {getAllUser} from '../../../actions/user.js'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import HenryIcon from '../../../images/henryUserIcon.jpg'
import Link from '@material-ui/core/Link';
import userCard from './userCards.js';
import { useHistory } from 'react-router-dom';

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

export default function SearchBar(props) {
    const classes = useStyles();
    const [state, setState] = useState([])
    const history = useHistory();

async function getUsers(state) {
  
  console.log(state)
   await fetch(`http://localhost:3001/user/users/${state}`)
      .then((response) => response.json())
      .then(usuarios => {
              userCard(usuarios)
            history.push(`/Home/search/?search=${state}`)
            })
      .catch(error => {
        return error;
      })
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

