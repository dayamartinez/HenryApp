import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getPm } from '../../actions/pm';
import {yellow, grey} from "@material-ui/core/colors";
import axios from 'axios';


const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export function AllGroups({getGroups,style}){
  const [groups, setGroups] = useState()
  const [buscar, setBuscar] = useState()
  
  
  // useEffect(()=>{
  //   getPm()
  //   .then(grupos => setGroups(grupos.payload)) 
  // }, [])

  useEffect(() => {
    fetch('http://localhost:3001/pm')
    .then(response => response.json())
    .then(grupos => 
     { console.log(grupos)
       setGroups(grupos)}) 
.catch(error => {
    return error;
})
}, [])

console.log(groups)

  return (
    <div class="bg-dark" style = {style}>
      {groups && groups.length === 0 ? (
        <div>
        <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}>
          {' '}
            No hay grupos para mostrar
          </h2>
        </div>
      ) : (
        <div> 
          <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}> Grupos </h2>
          <table class="table">
            <thead class="thead-dark">
              <tr>
              <th scope="col">Grupo</th>
              <th scope="col">PM</th>
              <th scope="col">Cohorte</th>
              <th scope="col">Alumnos del Grupo</th>
              </tr>
            </thead>

            <tbody>
              {console.log(groups)}
              {groups ? groups.map(group => 
               
                  <tr class="bg-light"> 
                    <td>{group.group.name}</td>
                    <td>{(group.usuario.name !== 'undefined') ? group.usuario.name : ('Sin PM asignado')}</td>
                    <td>{group.group.cohortId ? (group.cohort.name):('Sin cohorte asignado')}</td>
              <td>{console.log(group.group)}{group.group? (group.group.length):(undefined)}</td>
                  </tr>       
               ) : null}  

            </tbody>
          </table>
        </div>


        /*<TableContainer>
          <Table>
            <TableHead style={{backgroundColor:grey[900]}}>
              <TableRow  >
                <TableCell style={yellowText} >Grupo</TableCell>
                <TableCell style={yellowText} >PM</TableCell>
                <TableCell style={yellowText} >Cohorte</TableCell>
                <TableCell style={yellowText} >Alumnos del Grupo</TableCell>
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
                        {celda.group}
                    </Link>
                  </TableCell>

                  <TableCell>{celda.pm}</TableCell>

                  <TableCell>{celda.cohorte}</TableCell>

                  <TableCell>{celda.alumnos}</TableCell>
                  
                </TableRow>
              ))}
            </TableBody>
          </Table>
              </TableContainer>*/
        )}
    </div>
    )
}

const mapStateToProps = (state) => ({
  groups: state.group.groups
 })

const mapDispatchToProps = dispatch => ({
  getPm: () =>  dispatch(getPm())
})
    
export default connect(mapStateToProps, mapDispatchToProps)(AllGroups)