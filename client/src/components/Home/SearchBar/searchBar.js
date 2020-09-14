import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles((theme) => ({
  search: {
    display: 'flex',
    marginTop: '-40px',
    marginTop: '10px',
    marginLeft: '90px'
},
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
      background: 'dimgray',
      width: '400px',
      borderRadius: '20px',

    },
},
searchIcon: {
    display: 'flex',
    position: 'absolute',
    marginLeft: '5px',
    zIndex: '10',
    marginTop: '-5px'
}
}));

export default function SearchBar(props) {
    const classes = useStyles();
 
  return (
        <div>
         <div className={classes.search}>
            <div  className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          </div>
        
  );
}

// function mapStateToProps(state) {
//   return {
//     products: state.productsLoaded
//   }
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     getProducts: title => dispatch(getProducts(title))
//   };
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchBar)