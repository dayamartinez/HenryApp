import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getGroups } from '../../actions/groups';
import {yellow, grey} from "@material-ui/core/colors"


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function AllGroups({getGroups}){
  const [groups, setGroups] = useState()
  const classes = useStyles()
  const yellowText = {color:yellow[500]}
  useEffect(()=>{
    getGroups()
    .then(data => setGroups(data.payload))    
  }, [])
  var data
  if(groups){
    data = groups.map(group => 
      ({
        group: group.name,
        inicio: group.startDate,
        sobre: group.about,
        alumnos: group.usuarios.length,
        id: group.id
      })
    )
    console.log(data)
  }
  console.log(groups)
  return (
    <div> 
      {groups && groups.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay grupos para mostrar
          </h4>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor:grey[900]}}>
              <TableRow  >
                <TableCell style={yellowText} >Grupo</TableCell>
                <TableCell style={yellowText} >Fecha de inicio</TableCell>
                <TableCell style={yellowText} >Intructor/PM</TableCell>
                <TableCell style={yellowText} >Alumnos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map(celda => (
                <TableRow>

                  <TableCell>
                    <Link 
                      href={"/admin/groups/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.groups}
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
  getGroups: () =>  dispatch(getGroups())
})
    
export default connect(null, mapDispatchToProps)(AllGroups)