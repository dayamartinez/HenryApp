import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getInstructor} from '../../actions/instructor';
import {getCohortDetail, getCohorts} from '../../actions/cohort';
import {yellow, grey} from "@material-ui/core/colors"

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function ListInstructors({getInstructor, cohorts, cohortDetail, style, getCohorts, getCohortDetail}){
    const [instructor, setInstructor] = useState()
    const classes = useStyles()
    const yellowText = {color:yellow[500]}

    useEffect(()=>{
        getInstructor()
        .then(data => setInstructor(data.payload))     
    }, [])

    var data;
    console.log(instructor);
    if(instructor){
      data = instructor.map(p => 
        ({
          name: p.name,
          lastName: p.lastName,
          cohorte:undefined,
          id: p.id
        })
      )
      console.log(data)
  }

    return (
      <div class="bg-dark" style = {style}>
        <h2 class="bg-dark text-warning text-center"> Instructores </h2>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <button class="btn btn-outline-warning mb-2 mt-2 " onClick={() => getCohorts()}> Ver Todos </button>
        </div>
        <div class="bg-dark" style={{display:"flex", justifyContent:"center", marginTop: '3px'}}>
          <h6 class="text-light mt-2">Filtrar por cohorte: </h6>
          <div>
              {cohorts && cohorts.map((c) => (
                <button type="button" onClick={() => getCohortDetail(c.id)} class="btn btn-outline-warning ml-1 border-0" >{c.id}</button>
              ))
              } 
          </div>
        </div> 
        <table class="table">
          <thead class="thead-dark">
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Email</th>
            <th scope="col">Cohorte</th>
            </tr>
          </thead>

          <tbody>
            {cohortDetail.length ? cohortDetail.map((c) => (
              c.usuarios.filter(u => u.profile === "instructor").map(u => (
                <tr class="bg-light"> 
                  <td>{u.name}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.cohortId}</td>
                </tr> 
              ))                         
            )): cohorts.length ? cohorts.map((c) => (
                  c.usuarios.filter(u => u.profile === "instructor").map(u => (
                    <tr class="bg-light"> 
                      <td>{u.name}</td>
                      <td>{u.lastName}</td>
                      <td>{u.email}</td>
                      <td>{u.cohortId}</td>
                    </tr> 
                ))   
              )) : null
            }                
          </tbody>
        </table>
      </div>
    )
}

const mapStateToProps = (state) => ({
  cohorts: state.cohort.cohorts,
  cohortDetail: state.cohort.cohortDetail,
 })

const mapDispatchToProps = dispatch => {
    return {
        getInstructor:() => dispatch(getInstructor()),
        getCohorts: () =>  dispatch(getCohorts()),
        getCohortDetail: (id) => dispatch(getCohortDetail(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListInstructors)