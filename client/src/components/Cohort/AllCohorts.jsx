import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCohorts } from '../../actions/cohort';
import {yellow, grey} from "@material-ui/core/colors"
import {useHistory } from 'react-router-dom'
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
  var data
  
  const history = useHistory()

  if(cohorts){
    data = cohorts && cohorts.map(cohort => 
      ({
        cohorte: cohort.name,
        inicio: cohort.startDate,
        instructor: cohort.staffs.length,
        alumnos: cohort.usuarios.length,
        id: cohort.id,
        instructor: cohort.staffs
      })
    )
  }
  
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

          {cohorts ? data.map((celda) => (
                <tr class="bg-light"> 
                  <td><Link 
                      href={"/cohortDetail/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.cohorte}
                    </Link></td>
                  <td>{celda.inicio}</td>
                  <td>{celda.staffs ? celda.staffs[0].name : null}</td>
                  <td>{celda.alumnos}</td>
                </tr>       
            )): null
            }                
          </tbody>
        </table>
      </div>
  /*
    <div style={style}>  
      {cohorts && cohorts.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay cohortes para mostrar
          </h4>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor:grey[900]}}>
              <TableRow  >
                <TableCell style={yellowText} >Cohorte</TableCell>
                <TableCell style={yellowText} >Fecha de inicio</TableCell>
                <TableCell style={yellowText} >Instructor</TableCell>
                <TableCell style={yellowText} >Alumnos</TableCell>
                <TableCell style={yellowText} ></TableCell>
              </TableRow>
            </TableHead>
      
            <TableBody>
              {data && data.map(celda => (
                <TableRow>
                  {console.log(celda)}
                  <TableCell>
                    <Link 
                      href={"/cohortDetail/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.cohorte}
                    </Link>
                  </TableCell>

                  <TableCell>{celda.inicio}</TableCell>

                  <TableCell>{celda.instructor[0].name + ' ' + celda.instructor[0].lastName }</TableCell>

                  <TableCell>{celda.alumnos}</TableCell>
                  
                  <TableCell><button type="button" onClick={() => history.push(`/cohortDetail/${celda.id}`)} class="btn btn-outline-dark" >Detalles</button> </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )
      }
    </div>
*/

    )
}

const mapDispatchToProps = dispatch => ({
  getCohorts: () =>  dispatch(getCohorts())
})
    
export default connect(null, mapDispatchToProps)(AllCohorts)