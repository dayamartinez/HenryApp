import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getCohorts } from '../../actions/cohort';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function AllCohorts({getCohorts}){
  const [cohorts, setCohorts] = useState()
  const classes = useStyles()
    
  useEffect(()=>{
    getCohorts()
    .then(data => setCohorts(data.payload))    
  }, [])
  var data
  if(cohorts){
    data = cohorts.map(cohort => 
      ({
        cohorte: cohort.name,
        inicio: cohort.startDate,
        sobre: cohort.about,
        alumnos: cohort.usuarios.length,
        id: cohort.id
      })
    )
    console.log(data)
  }
  console.log(cohorts)
  return (
    <div> 
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
            <TableHead>
              <TableRow>
                <TableCell>Cohorte</TableCell>
                <TableCell>Fecha de inicio</TableCell>
                <TableCell>Intructor</TableCell>
                <TableCell>Alumnos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map(celda => (
                <TableRow>

                  <TableCell>
                    <Link 
                      href={"/admin/cohorts/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.cohorte}
                    </Link>
                  </TableCell>

                  <TableCell>{celda.inicio}</TableCell>

                  <TableCell>{celda.sobre}</TableCell>

                  <TableCell>{celda.alumnos}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )
      }
    </div>
    )
}

const mapDispatchToProps = dispatch => ({
  getCohorts: () =>  dispatch(getCohorts())
})
    
export default connect(null, mapDispatchToProps)(AllCohorts)