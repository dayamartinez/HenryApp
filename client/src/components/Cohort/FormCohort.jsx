import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import {addCohort, updateCohort} from '../../actions/cohort'
import { useHistory } from 'react-router-dom'
import swal from 'sweetalert'

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
  }));
  
  export function FormCohort({ match, addCohort, updateCohort}) {
     let id = match.params.id
     const history = useHistory()

    const classes = useStyles();
    const [input, setInput]= useState({
      name:'',
      startDate: '',
      about:''
      
    });

    useEffect(() =>{
      if(id){
          fetch(`http://localhost:3001/cohort/${id}`,
           {credentials: 'include'})
           .then(res => {
            return res.json()
          })
          .then(cohort => {
            setInput({
              ...input,
                name: cohort.name,
                startDate: cohort.startDate,
                about: cohort.about  
            })
      }).catch()  
      }  
  }, [])

    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = function (e) {
        e.preventDefault()
        const newCohort = {
          name: input.name,
          startDate: input.startDate,
          about: input.about
        }
        if(id){
          updateCohort(id, newCohort)
        }  
         else {
        addCohort(newCohort) 
        swal('bien').then(res => {
          if(res){
            history.push("/")
          } else{ return null}
        })              
             
         }
	}

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        { id ? 
        <Typography component="h1" variant="h5">
        Cohorte
      </Typography>:
        <Typography component="h1" variant="h5">
            Nuevo Cohorte
          </Typography>  
        }
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
            <TextField
              variant="outlined"
              margin="normal"
              fullWidth
              name="about"
              label="Acerca del Cohorte"
              type="about"
              id="about"
              value={input.about}
              onChange={handleInputChange}
            />

            {id?
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Modificar
          </Button> :
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Crear
            </Button>}
            <Button
              type="onClick"
              fullWidth
              variant="contained"
              color="secondary"
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
 
  const mapDispatchToProps = dispatch => { 
    return {
      addCohort: (cohort) => dispatch(addCohort(cohort)),
      updateCohort: (id, cohort) => dispatch(updateCohort(id, cohort))
    }
  }
  export default connect(null, mapDispatchToProps)(FormCohort)