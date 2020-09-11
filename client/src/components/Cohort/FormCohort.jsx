import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'
import {addCohort, updateCohort, getCohortDetail} from '../../actions/cohort'

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
      margin: theme.spacing(3, 0, 2),
    },
  }));
  

  export function FormCohort({ match, addCohort, updateCohort}) {
     let id = match

    const classes = useStyles();
   // const [students, setStudents] = useState([])
    const [input, setInput]= useState({
      name:'',
      about:'' // necesita una fecha de inicio
    });

    useEffect(() =>{
        if(id){
            getCohortDetail(id)
            .then(cohort => {
            setInput({
            ...input,
            name: cohort.name,
            about: cohort.about 
            })   
        })  
        }  
    }, [id, input])

    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = function (e) {
        e.preventDefault()
        id ? updateCohort(id, input.name, input.about) : addCohort(input)
	}

    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
        
          <Typography component="h1" variant="h5">
            Nuevo Cohorte
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
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="about"
              label="Fecha de Inicio"
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
          </form>
        </div>
      </Container>
    )
  }
 
  const mapDispatchToProps = dispatch => { 
    return {
      addCohort: (cohort) => dispatch(addCohort(cohort)),
      updateCohort: (id, nameCoh, date) => dispatch(updateCohort(id, nameCoh, date)),
      getCohortDetail: (id) => dispatch(getCohortDetail(id))
    }
  }
  export default connect(null, mapDispatchToProps)(FormCohort)