import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getInstructor} from '../../actions/instructor'
import {yellow, grey} from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function ListInstructors({getInstructor,style}){
    const [instructor, setInstructor] = useState()
    const classes = useStyles()
    const yellowText = {color:yellow[500]}

    useEffect(()=>{
        getInstructor()
        .then(data => setInstructor(data.payload))     
    }, [])
    var data
  if(instructor){
    data = instructor.map(p => 
      ({
        name: p.name,
        mail: p.email,
        cohorte:p.cohort.name,
        id: p.id
      })
    )
    console.log(data)
  }
    return (
        <div style={style}> 
          {instructor && instructor.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay Instructores para mostrar
          </h4>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor:grey[900]}}>
              <TableRow>
                <TableCell style={yellowText}>Nombre</TableCell>
                <TableCell style={yellowText}>Mail</TableCell>
                <TableCell style={yellowText}>Cohorte</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map(celda => (
                <TableRow>

                  <TableCell>
                    <Link 
                      href={"/admin/instructor/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.name}
                    </Link>
                  </TableCell>

                  <TableCell>{celda.mail}</TableCell>

                  <TableCell>{celda.cohorte}</TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        )}
      </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getInstructor:() => dispatch(getInstructor())
    }
}
export default connect(null, mapDispatchToProps)(ListInstructors)