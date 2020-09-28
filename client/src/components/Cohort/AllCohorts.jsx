import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCohorts } from '../../actions/cohort';
import {yellow, grey} from "@material-ui/core/colors"
const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function AllCohorts({getCohorts,style}){
  const [cohorts, setCohorts] = useState()
  const classes = useStyles()
  const yellowText = {color:yellow[500]}
  useEffect(()=>{
    getCohorts()
    .then(data => setCohorts(data.payload))    
  }, [])
 
  return (
  
    <div class="bg-dark" style = {style}>
        <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}> Cohortes </h2>
        <table class="table">
          <thead class="thead-dark">
            <tr>
            <th scope="col">Cohorte</th>
            <th scope="col">Fecha de Inicio</th>
            <th scope="col">Instructor</th>
            <th scope="col">Alumnos</th>
            </tr>
          </thead>

          <tbody>

          {cohorts ? cohorts.map((celda) => (
                <tr class="bg-light"> 
                  <td><Link 
                      href={"/cohortDetail/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.name}
                    </Link></td>
                  <td>{celda.startDate}</td>
                  <td>{celda.staffs.length ? (celda.staffs[0].name +" "+ celda.staffs[0].lastName) : null}</td>
                  <td>{celda.usuarios ? celda.usuarios.length : null}</td>
                </tr>       
            )): null
            }                
          </tbody>
        </table>
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
  getCohorts: () =>  dispatch(getCohorts())
})
    
export default connect(null, mapDispatchToProps)(AllCohorts)