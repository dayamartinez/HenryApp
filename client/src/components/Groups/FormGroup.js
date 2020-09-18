import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'

import {addGroup} from '../../actions/group'
import {useHistory } from 'react-router-dom'

import ExcelLoader from '../Cohort/ExcelLoader';


  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%', 
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(2, 0, 0),
      marginButton: theme.spacing(2)
    },
    delete: {
      backgroundColor: 'darkgray',
      color: 'white',
      marginBorder: '0px'     
    }
  }));
  
  export function FormGroup({ match, addGroup, emails}) {

    const history = useHistory()

    const classes = useStyles();
    
    const [input, setInput]= useState({
      name:'',
      startDate: ''
    });

    
    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = function (e) {
        e.preventDefault()
        const group = {
          name: input.name,
          cohort: input.cohort,
          emails: emails
        }
        addGroup(group)
    }

    return (
      <Container component="main" maxWidth="xs">
       <CssBaseline />
        <div className={classes.paper}>
        <Typography component="h1" variant="h5">
            Nuevo Grupo
          </Typography>  
        
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Nombre"
              name="name"
              autoFocus
              value={input.name}
              onChange={handleInputChange}
            />
            <TextField
            type="date"
            variant="outlined"
            margin="normal"
            fullWidth
            name="startDate"
            id="startDate"
            value={input.startDate}
            onChange={handleInputChange}
            required
            />
             
            {/*Se llama a la función para cargar las direcciones de email de los alumnos */}
            <ExcelLoader/>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Crear
            </Button>
            <Button
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={() => history.replace('/admin') }
            >
              Cancelar
            </Button>
          </form>
           
        </div>
      </Container>
    )
  }

  const mapStateToProps = (state) => {
    return {
      emails: state.cohort.emails
    }
  }
 
  const mapDispatchToProps = dispatch => { 
    return {
      addGroup: (group) => dispatch(addGroup(group))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FormGroup)
