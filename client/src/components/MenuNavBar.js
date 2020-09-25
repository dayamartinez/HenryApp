import React from 'react';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuList from '@material-ui/core/MenuList';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import {connect} from 'react-redux';
import {useHistory} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(2),
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
        >
          <MenuIcon />
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
                    <MenuItem onClick={(e) => redirect(e, '/profile')}>Inicio</MenuItem>
                    <MenuItem onClick={handleClose}>Mis Grupos</MenuItem>
                    <MenuItem onClick={handleClose}>Mi cohorte</MenuItem>
                    <MenuItem onClick={handleClose}>Mensajes</MenuItem>
                    
                  </MenuList> : 
                  
                  <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                    <MenuItem onClick={(e) => redirect(e, '/profile')}>Inicio</MenuItem>
                    <MenuItem onClick={handleClose}>Mensajes</MenuItem>
                    <MenuItem onClick={(e) => redirect(e, '/admin')}>Administración</MenuItem>
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

export default connect(mapStateToProps,null)(CustomizedMenus);