import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from './SettingMenu'
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2, 6, 10),
  },
  profileImg: {
    marginTop: "50px"
  },
  portadaImg: {
    marginTop: "50px",
    marginBottom: "50px"
  },
  button: {
    marginTop: "20px"
  },
  
}));

export default function ProfilePictureChange() {
  const [password, setPassword]= useState({
   password: '',
   newPassword: '',
   confirm_newPassword: ''
  })
  const classes = useStyles();

  return (
    <div >
  <Container component="main" maxWidth="xs">
          <Menu/>
                <div className={classes.paper}>
                <form className={classes.form} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="name"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="Update Name"
                autoFocus
                // onChange={(e) => handleInputChange(e)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="flastName"
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label=" Update LastName"
                name="lastName"
                autoComplete="lname"
                // onChange={(e) => handleInputChange(e)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.button}
            // onClick={(e)=>onSend(e)}
          >
            Guardar cambios
          </Button>
         
          </form>
                   
                </div>
            </Container>
    </div>
  );
}