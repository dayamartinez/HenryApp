import React, {useState, useEffect} from 'react';
import { CssBaseline,Button,TextField,Typography,Container,Grid,Box } from '@material-ui/core';
import { makeStyles} from '@material-ui/core';
import { connect } from 'react-redux'
import axios from "axios"
import {addGroup} from '../../actions/group'
import {useHistory } from 'react-router-dom'

import ExcelLoader from '../Cohort/ExcelLoader';
/* componente de creacion de grupos  */

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
    },
    fondo1:{
      backgroundColor:theme.palette.primary
    }
  }));
  
  export function FormGroup({ match, addGroup, emails}) {

    const history = useHistory()
    const classes = useStyles();
    const [groups,setGroups] = useState([])
    const [cohort, setCohort] = useState({})
    const [input, setInput]= useState({
      name:'',
      startDate: ''
    });
    
    useEffect(()=>{
      axios.get("http://localhost:3001/cohort")
      .then(res=>{
        setCohort(
          res.data[res.data.length-1]
          )
      })

    },[])

    const repartirAlumnos = function(alumnos,grupos){
      var res =[]
      var i = 0,k = alumnos.length/grupos
      while(i<alumnos.length){
        res.push(alumnos.slice(i,i+k))
        i+=k
      }
      if (res.length != grupos){
        console.log("holi")
        let j = 0
        while(res[grupos].length){
          res[j].push(res[grupos].shift())
          j++
        }
        res.pop()
      }
      setGroups(res)
      console.log(res)
    }


    const handleInputChange = function(e) {
      console.log(cohort.usuarios)   
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
      if (e.target.value){
        repartirAlumnos(cohort.usuarios,e.target.value)
      }
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
        <Grid container>
          <Grid item >
            <Box className={classes.fondo1}>
              <Typography>
                Cohorte
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
            <Typography>
                Alumnos Totales del Cohorte:
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
            <Typography>
                Projects Managers Disponibles:
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <Typography>
                Ingresar Cantidad de Grupos a Crear
              </Typography>
            </Box>
            <Box>
              <TextField type="number" onChange={(e) => handleInputChange(e)}/>
            </Box>
          </Grid>
          <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleInputChange(e)}
          >
              Crear
          </Button>
          </Grid>
          <Grid item>
            <Button
            fullWidth
            variant="contained"
            className={classes.submit}
            onClick={() => history.replace('/admin') }
          >
              Cancelar
          </Button>
          </Grid>
          
        </Grid>
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
