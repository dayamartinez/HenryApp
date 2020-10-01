import React, {useState, useEffect} from 'react';
import { CssBaseline,Button,TextField,Typography,Container,Grid,Box, Input } from '@material-ui/core';
import { makeStyles} from '@material-ui/core';
import { connect } from 'react-redux'
import axios from "axios"
import {addGroup} from '../../actions/group'
import {getPm} from '../../actions/pm'
import {getCohorts} from '../../actions/cohort'
import {useHistory } from 'react-router-dom'
import fondo from "../../images/Fondo.png"

/* componente de creacion de grupos  */

const useStyles = makeStyles((theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  title: {
    marginLeft: "150px",
    margin: theme.spacing(4),
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginLeft: "150px",
    marginBottom: "50px",
  },
  formControl:{
    width: '100%',
  },
  submit: {
    margin: theme.spacing(2, 0, 0),
    marginButton: theme.spacing(2)
  },
  inputGroup:{
    fontSize:"1.5rem",
    align:"center"
  },
  background: {
    backgroundImage:`url(${fondo})` ,
    height: '100vh'
  },
  input: {
    background: "white",
    
  }
}));

  
  export function FormGroup({ getPm, pms, getCohorts, addGroup, style}) {

  const history = useHistory()
  const classes = useStyles();
  const [pm,setPm] = useState(pms)
  const [groups,setGroups] = useState([])
  const [cohort, setCohort] = useState({usuarios:[]})
  const [input, setInput]= useState({
    grupos: 1
  });
  
  var aux
  useEffect(()=>{
    getPm()
    .then(data => {
      setPm(data.payload.filter(p=> !p.groupId))
    })
    getCohorts()  
    .then(res=>{
      setCohort(
        res.payload[res.payload.length-1]
      )
    })
    .catch(err =>{console.log("Error")})          
  },[input])
      

  const handleInputChange = function(e) {
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


const sleep= function(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }  

  const handleSubmit = async function (e) {
    e.preventDefault()
    addGroup(cohort.id,input.grupos)
    await sleep(2000)
    axios.put("http://localhost:3001/pm/setGroup/"+cohort.id)
  }

  return (
    <div className={classes.background}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          
          <Typography className={classes.title} component="h1" variant="h5">
            Crear Grupos
          </Typography>

        <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue="Cohorte"
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue={cohort?cohort.name:"..."}
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue="Alumnos Totales"
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                defaultValue={cohort?cohort.usuarios.length:"..."}
                InputProps={{
                  readOnly: true
                }}
                marginLeft="50px"
              />
              </Grid>
              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue="PMs Disponibles"
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue={pm.length}
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField 
                id="standard-read-only-input"
                variant="outlined"
                required
                className={classes.input}
                fullWidth
                defaultValue="Cantidad de Grupos"
                InputProps={{
                  readOnly: true
                }}
              />
              </Grid>

              <Grid item xs={12} sm={6}>
              <TextField
              name="grupos" 
              defaultValue={1} 
              onChange={(e) => handleInputChange(e)}
              id="filled-number"
              type="number"
              InputLabelProps={{
                shrink: true,
              }}
              variant="outlined"
              />
              </Grid>

              <Grid style={{margin:"auto"}} item xs={6}>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit} onClick={(e) => handleSubmit(e)} >
            Crear
          </Button>
        </Grid>
            </Grid>
 
       </form>
      </div>
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
      getPm: ()=> dispatch(getPm()),
      getCohorts: () => dispatch(getCohorts())
    }
  }
  export default connect(mapStateToProps, mapDispatchToProps)(FormGroup)
