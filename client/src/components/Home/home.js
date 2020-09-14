import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SearchBar from './SearchBar/searchBar.js'

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
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    return (
        <div >
            <div className={classes.totalBackground}>
            <Paper className={classes.tabcontainer}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                >
                    <Tab label="General" />
                    <Tab label="Destacado" />
                    <SearchBar /> 
                </Tabs>
                </Paper>
        </div>
        </div>
    )
}