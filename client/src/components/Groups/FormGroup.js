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
  
  export function FormGroup({ pms, addGroup, emails}) {

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

    },[input])

    const handleInputChange = function(e) {
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }

    const handleSubmit = function (e) {
        e.preventDefault()
        addGroup(cohort.id,input.grupos)
        axios.put("http://localhost:3001/pm/setGroup/"+cohort.id)
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
                Alumnos Totales del Cohorte:{emails.length}
              </Typography>
            </Box>
          </Grid>
          <Grid item>
            <Box>
            <Typography>
                Projects Managers Disponibles:{pms.length}
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
              <TextField type="number" name="grupos" onChange={(e) => handleInputChange(e)}/>
            </Box>
          </Grid>
          <Grid item>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => handleSubmit(e)}
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
    return{
      emails: state.cohort.emails,
      pms: state.pm.pms
    }
  }
 
  const mapDispatchToProps = dispatch => { 
    return {
      addGroup: (cohortId,grupos) => dispatch(addGroup(cohortId,grupos))
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FormGroup)
