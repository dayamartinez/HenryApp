import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getPm} from '../../actions/pm'
import {yellow, grey} from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function ListPM({getPm,style}){
    const [pm, setPm] = useState()
    const classes = useStyles()
    const yellowText = {color:yellow[500]}

    useEffect(()=>{
        getPm()
        .then(data => setPm(data.payload))     
    }, [])
    var data
  
    if(pm){
    data = pm.map(p => 
      ({
        name: p.usuario.name,
        lastName: p.usuario.lastName,
        mail: p.usuario.email,
        group:p.group.name,
        id: p.id
      })
    )
    
  }
    return (
        <div style={style}> 
          {pm && pm.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay Project Managers para mostrar
          </h4>
        </div>
      ) : (
        <TableContainer>
          <Table>
            <TableHead style={{backgroundColor: '#343a40'}}>
              <TableRow>
                <TableCell style={yellowText}>Nombre</TableCell>
                <TableCell style={yellowText}>Apellido</TableCell>
                <TableCell style={yellowText}>Mail</TableCell>
                <TableCell style={yellowText}>Grupo</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data && data.map(celda => (
                <TableRow>

                  <TableCell>
                    <Link 
                      href={"/admin/pms/"+celda.id} 
                      color="inherit" 
                      underline="none">
                        {celda.name}
                    </Link>
                  </TableCell>

                  <TableCell>{celda.lastName}</TableCell>

                  <TableCell>{celda.mail}</TableCell>

                  <TableCell>{celda.group}</TableCell>

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
        getPm:() => dispatch(getPm())
    }
}
export default connect(null, mapDispatchToProps)(ListPM)