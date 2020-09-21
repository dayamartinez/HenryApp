import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
// import { Link } from 'react-router-dom'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { getGroups } from '../../actions/group';
import {yellow, grey} from "@material-ui/core/colors"


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
  const classes = useStyles()
  const yellowText = {color:yellow[500]}
  
  useEffect(()=>{
    getGroups()
    .then(data => setGroups(data.payload))    
  }, [])

  const buscarPM = (usuarios,pmId)=>{
    var pmName = "El grupo no tiene un PM asignado."
    usuarios.forEach(usuario => {
        if(pmId === usuario.id){
            pmName = usuario.name + " " + usuario.lastName
        }
    })
    return pmName

  }


  var data
  if(groups){
    data = groups.map(group => 
      ({
        /* se sacaron el about y la fecha de inicio para los grupos, en cambio se agregaron las columnas de pm y la de cohorte*/
        group: group.name,
        pm:buscarPM(group.usuarios, group.PMs[0].usuarioId),
        cohorte: group.cohort ? (group.cohort.name):('Sin cohorte asignado'),
        alumnos: group.usuarios?(group.usuarios.length):(undefined),
        id: group.id
      })
    )
    console.log(data)
  }
  console.log(groups)
  return (
    <div style={style}> 
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
        </TableContainer>
        )
      }
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