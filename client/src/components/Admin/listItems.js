import React from 'react';
import { Link } from 'react-router-dom'

import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import GroupIcon from '@material-ui/icons/Group';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import AssignmentIcon from '@material-ui/icons/Assignment';

import GroupAddIcon from '@material-ui/icons/GroupAdd';

export const mainListItems = (
  <div>
    <ListItem button>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <Link to='/students'>
      <ListItemText primary="Alumnos" />
      </Link>
      
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon />
      </ListItemIcon>
      <ListItemText primary="Intructores" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupIcon/>
      </ListItemIcon>
      <Link to='/pms'>
       <ListItemText primary="PMs" />
      </Link>
     
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupWorkIcon />
      </ListItemIcon>
      <Link to='/cohorts' >
        <ListItemText primary="Cohortes" />
        </Link>
      
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupWorkIcon/>
      </ListItemIcon>
      <ListItemText primary="Grupos" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon/>
      </ListItemIcon>
      <Link to='/admin/createCohort'>
      <ListItemText primary="Crear Cohorte" />
      </Link>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Crear Grupos" />
    </ListItem>
    
  </div>
);
