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
                <TableCell style={yellowText} >Intructor</TableCell>
                <TableCell style={yellowText} >Alumnos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map(celda => (
                <TableRow>

                  <TableCell>
                    <Link 
                      href={"/cohortDetail/"+celda.id} 
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