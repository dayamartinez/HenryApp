import React from 'react';
import { Link } from '@material-ui/core'

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
    <Link href='/admin' color="secondary" underline="none">
      <ListItem button>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
    </Link>
    <Link href='/admin/students' color="secondary" underline="none">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Alumnos" />
      </ListItem>
    </Link>
    <Link href='/admin/instructors' color="secondary" underline="none">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon />
        </ListItemIcon>
        <ListItemText primary="Intructores" />
      </ListItem>
    </Link>
    <Link href='/admin/pms' color="secondary" underline="none">
      <ListItem button>
        <ListItemIcon>
          <GroupIcon/>
        </ListItemIcon>
      <ListItemText primary="PMs" />
      </ListItem>
    </Link>

    <Link href='/admin/cohorts' color="secondary" underline="none">
      <ListItem button>
        <ListItemIcon>
          <GroupWorkIcon />
        </ListItemIcon>
        <ListItemText primary="Cohortes" />
      </ListItem>
    </Link>

    <Link href='/admin/groups' color="secondary" underline="none"> 
      <ListItem button>
        <ListItemIcon>
          <GroupWorkIcon/>
        </ListItemIcon>
        <ListItemText primary="Grupos" />
      </ListItem>
    </Link>

    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon/>
      </ListItemIcon>
      <Link href='/admin/createCohort' color="inherit" underline="none">
      <ListItemText primary="Crear Cohorte" />
      </Link>
    </ListItem>
    
    <Link href='/admin/formGroup' color="secondary" underline="none">
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Crear Grupos" />
    </ListItem>
    </Link>
    <Link href='/admin/createStaff' color="secondary" underline="none">
    <ListItem button>
      <ListItemIcon>
        <GroupAddIcon/>
      </ListItemIcon>
      <ListItemText primary="Registrar personal" />
    </ListItem>
    </Link>
  </div>
);
