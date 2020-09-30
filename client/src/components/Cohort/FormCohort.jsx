import React, {useState, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { connect } from 'react-redux'

import {addCohort, updateCohort, removeCohort, getCohortDetail} from '../../actions/cohort'
import {getInstructor, getInstructorDetail} from '../../actions/instructor'
import {useHistory } from 'react-router-dom'
import swal from 'sweetalert'
import ExcelLoader from './ExcelLoader';


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
  
  export function FormCohort({ match, addCohort, getCohortDetail, updateCohort, removeCohort, emails, getInstructor, getInstructorDetail}) {

    let id = match.params.id
    const history = useHistory()

    const classes = useStyles();
    
    const [input, setInput]= useState({
      name:'',
      startDate: ''
    });

    const [instructor, setInstructor] = useState()
    const [selector, setSelector] = useState({
      name: 'Seleccione Instructor',
      id:''
    })

  useEffect(() => {
    getInstructor()
      .then(data => setInstructor(data.payload))
      .catch()
    
    if(id){
      getCohortDetail(id)
      .then(data => {
        setInput({
          ...input,
          name: data.payload[0].name,
          startDate: data.payload[0].startDate
        })
      })
      .catch()  
    } 
  },[])  

    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
      console.log(input)
    }

    const handleSubmit = function (e) {
       // e.preventDefault()
        const cohort = {
          name: input.name,
          instructorId: selector.id,
          startDate: input.startDate
        }
       id ? updateCohort(id, cohort) : addCohort(cohort, emails)
       swal("Cohorte creado correctamente")
       history.push('/admin/createCohort/groups')
    }

    //se agrega función para que al hacer click en crear, se envien al back los correos que fueron cargados
    const sendMail = function(e){
      e.preventDefault();
      handleSubmit();
     
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
            <div class="btn-group" role="group">
              <button id="btnGroupDrop1" type="button" class="btn btn-outline-warning mb-2 mt-2 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {selector.name}
              </button >
              <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" role="menu">
                {instructor && instructor.map((i) => (    
                       
                  <a type="button" onClick={() => {getInstructorDetail(i.id); setSelector({name: i.name + " "+ i.lastName, id: i.id})}} class="dropdown-item">{i.name + " "+ i.lastName}</a>
                ))}       
                                   
              </div>
            </div>
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
              onClick={(e)=> sendMail(e)}
            >
              Crear
            </Button>}

          </form>
           { id ?
             <div>
             <hr/>
             <Button className={classes.delete}
             onClick={() => {
              swal({
                title: 'Eliminar',
                text: 'Seguro desea eliminar el cohorte?',
                icon: 'warning',
                buttons: ['No', 'Si'],
                dangerMode: true,
              }).then(res =>{
                if(res){
                   removeCohort(id)
                   swal('Se elimino el cohorte correctamente', '', 'success')
                   .then(() => history.replace('/admin'))    
                } else {
                  return null}
              })
            }}
             > Eliminar Cohorte </Button>
           </div> : null} 
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
      addCohort: (cohort,emails) => dispatch(addCohort(cohort,emails)),
      updateCohort: (id, cohort) => dispatch(updateCohort(id, cohort)),
      removeCohort: (id) => dispatch(removeCohort(id)),
      getCohortDetail: (id) => dispatch(getCohortDetail(id)),
      getInstructor: (id) => dispatch(getInstructor()),
      getInstructorDetail: (id) => dispatch(getInstructorDetail(id))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FormCohort)
