import React, {useState, useEffect} from 'react';
import { CssBaseline,Button,TextField,Typography,Container,Grid,Box, Input } from '@material-ui/core';
import { makeStyles} from '@material-ui/core';
import { connect } from 'react-redux'
import axios from "axios"
import {addGroup} from '../../actions/group'
import {getPm} from '../../actions/pm'
import {useHistory } from 'react-router-dom'

import ExcelLoader from '../Cohort/ExcelLoader';
/* componente de creacion de grupos  */

  const useStyles = makeStyles((theme) => ({
    submit: {
      margin: theme.spacing(2, 0, 0),
      marginButton: theme.spacing(2)
    },
    inputGroup:{
      fontSize:"1.5rem",
      right:1
    }
  }));
  
  export function FormGroup({ getPm,pms, addGroup, emails, style}) {

  const history = useHistory()
  const classes = useStyles();
  const [pm,setPm] = useState(pms)
  const [groups,setGroups] = useState([])
  const [cohort, setCohort] = useState({})
  const [input, setInput]= useState({
    name:'',
    startDate: ''
  });
  
  var aux
  useEffect(()=>{
    aux = pm.filter(p=> !p.groupId)
      getPm().then(res=>{
        setPm(
          aux
          )
        })
      axios.get("http://localhost:3001/cohort")
      .then(res=>{
        setCohort(
          res.data[res.data.length-1]
          )
        })
        .catch(err =>{console.log("UUUUUhhhhhh soy un Error")})          
      },[input])
      
  const handleInputChange = function(e) {
    console.log(cohort)
    const g=Number(e.target.value)
    if (g > pm.length){
      e.target.value = pm.length
    }else if (g <= 0){
      e.target.value = 1
    } else{
      setInput({
        ...input,
        [e.target.name]:e.target.value
      })
    }
  }

  const handleSubmit = function (e) {
      e.preventDefault()
      addGroup(cohort.id,input.grupos)
      axios.put("http://localhost:3001/pm/setGroup/"+cohort.id)
  }

  return (
    <div style={style}>  
    <Container component="main" maxWidth="sm" style={{margin:"auto",backgroundColor:"rgb(220,220,220)"}}>
      <Typography component="h1" variant="h4" align="center">  Crear Grupos </Typography>
      <Grid container style={{margin:"auto"}}>
        <Grid item xs={6}> <Typography component="h1" variant="h5">  Cohorte: </Typography> </Grid>
        <Grid item xs={6}> <Typography component="h1" variant="h5" align="right">  {cohort?cohort.name:"..."} </Typography> </Grid>
        <Grid container>
          <Grid item xs={6}> <Typography component="h1" variant="h5"> Alumnos Totales </Typography> </Grid>
          <Grid item xs={6}> <Typography component="h1" variant="h5" align="right"> {cohort.usuarios?cohort.usuarios.length:"..."} </Typography> </Grid>
          <Grid item xs={6}> <Typography component="h1" variant="h5"> PMs Disponibles </Typography> </Grid>
          <Grid item xs={6}> <Typography component="h1" variant="h5" align="right"> {pm.length} </Typography> </Grid>
        </Grid>
        <Grid container style={{justifyContent:"space-between"}}>
          <Grid item xs={6}> <Typography component="h1" variant="h5"> Cuantos Grupos?</Typography> </Grid>
          <Grid item xs={2} sm={1}> <Input type="number" className={classes.inputGroup} name="grupos" defaultValue={1} onChange={(e) => handleInputChange(e)}/> </Grid>
        </Grid>
        <Grid style={{margin:"auto"}} item xs={6}>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => handleSubmit(e)} >
            Crear
          </Button>
        </Grid>
      </Grid>
    </Container>
    </div>
  )
}

  const mapStateToProps = (state) => {
    return{
      emails: state.cohort.emails,
      pms: state.pm.pms,
    }
  }
 
  const mapDispatchToProps = dispatch => { 
    return {
      addGroup: (cohortId,grupos) => dispatch(addGroup(cohortId,grupos)),
      getPm: ()=> dispatch(getPm())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FormGroup)
