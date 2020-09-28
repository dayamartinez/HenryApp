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
    
   
    return (
      <div class="bg-dark" style = {style}>
        {pm && pm.length === 0 ? (
        <div>
          <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}>
            {' '}
            No hay PMs para mostrar
          </h2>
        </div>
        ) : (
        <div> 
          <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}> PMs </h2>
          <table class="table">
            <thead class="thead-dark">
              <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Apellido</th>
              <th scope="col">Email</th>
              <th scope="col">Grupo</th>
              </tr>
            </thead>

            <tbody>
              {pm ? pm.map((u) => (
                  <tr class="bg-light"> 
                    <td>{u.usuario.name}</td>
                    <td>{u.usuario.lastName}</td>
                    <td>{u.usuario.email}</td>
                    <td>{u.group ? u.group.name : null}</td>
                  </tr>       
              )): null}                
            </tbody>
          </table>
        </div>
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