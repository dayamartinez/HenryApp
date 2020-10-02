import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { userLogout } from '../actions/user';
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginLeft: '-18px'
    },
    menu: {
        color: '#fdd835'
    },
  }));


export function CustomizedMenus(props) {
  const history = useHistory();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };
    
  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
  
    setOpen(false);
  };

  const redirect = (event, path) => {
    handleClose(event);
    history.push(path);
  }
    
  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  const logout = function(e) {
    e.preventDefault(e)
      props.userLogout()
  
    //CON ESTA LLAMADA LE PEGAMOS A LOGOUT EN EL BACK
    axios.get('http://localhost:3001/logout')
    .then(async res=>{
      await alert("Sesión cerrada");
      history.push('/')
    })
  
    //MANEJO DE ERRORES...
    .catch(err=>{
      alert(err);
    })
    return;
  }

       // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <div className={classes.root}>
      <div>

        <Button
          ref={anchorRef}
          className={classes.menu}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          color= "primary"
        >
        <AccountBoxIcon/> 
        </Button>
        <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  
                  {/*Se muestran opciones diferentes a los usuarios y al personal del staff de Henry*/}
                  
                  {(props.user.user.rol === "user") ? 
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(e) => redirect(e, '/profile')}>Mi perfil</MenuItem>
                    <MenuItem onClick={(e) => redirect(e, `/cohortDetail/${props.user.user.cohortId}`)}>Mi cohorte</MenuItem>
                    <MenuItem onClick={(e)=>logout(e)}>Cerrar sesion</MenuItem>
                    
                  </MenuList> : 
                  
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(e) => redirect(e, '/profile')}>Mi perfil</MenuItem>
                    <MenuItem onClick={(e) => redirect(e, '/profile')}>Inicio</MenuItem>
                    <MenuItem onClick={handleClose}>Mensajes</MenuItem>
                    <MenuItem onClick={(e) => redirect(e, '/admin')}>Administración</MenuItem>
                    <MenuItem onClick={(e)=>logout(e)}>Cerrar sesion</MenuItem>
                  </MenuList> }

                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

const mapDispatchToProps = dispatch => {
  return {
    userLogout:() => dispatch(userLogout()),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomizedMenus);

