import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getGroups } from '../../actions/group';
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
  
  
  useEffect(()=>{
    getGroups()
    .then(grupos => setGroups(grupos.payload)) 
  }, [])

  
  function buscarPM(pmId){
    var pmName = "El grupo no tiene un PM asignado."
    axios.get("http://localhost:3001/pm/"+ pmId)
    .then(res =>{
      pmName = res.data.usuario.name + ' ' + res.data.usuario.lastName
      setBuscar(pmName)
    })
  }

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
              {groups ? groups.map(group => {group.PMs[0] && buscarPM( group.PMs[0].usuarioId)
                return(
                  <tr class="bg-light"> 
                    <td>{group.name}</td>
                    <td>{group.PMs[0] ? (buscar) : ('Sin PM asignado')}</td>
                    <td>{group.cohort ? (group.cohort.name):('Sin cohorte asignado')}</td>
                    <td>{group.usuarios?(group.usuarios.length):(undefined)}</td>
                  </tr>       
              )}) : null}  

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
  getGroups: () =>  dispatch(getGroups())
})
    
export default connect(mapStateToProps, mapDispatchToProps)(AllGroups)