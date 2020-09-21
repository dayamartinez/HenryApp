import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import UserCard from './SearchBar/userCards.js';

const useStyles = makeStyles((theme) => ({
    totalBackground: {
      marginRight: '40px',
      marginLeft: '40px',
      background: '#f5f5f6',
      height: '1000px',
      border: 'solid',
      borderColor: 'darkgray'
    },
    tabcontainer: {
        justifyContent: 'flex-start',
        height: '50px',
    }
  }));

export default function Home(){
    const classes = useStyles();
  


    return (
        <div >
            <div className={classes.totalBackground}>
          <UserCard/>
           
        </div>
        </div>
    )
}