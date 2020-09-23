import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {Link,Table,TableContainer,TableHead, TableBody,TableRow,TableCell} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {getCohortDetail, getCohorts} from '../../actions/cohort';
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

export function ListInstructors({getInstructor, cohorts, cohortDetail, style, getCohorts, getCohortDetail}){
    const [instructor, setInstructor] = useState()
    const classes = useStyles()
    const yellowText = {color:yellow[500]}

    useEffect(()=>{
 //       getCohorts()
//       .then(data => setCohorts(data.payload)) 
      getInstructor()
      .then(data => setInstructor(data.payload))
    }, [])

    var data;
    
    /*if(cohorts){
      data = cohorts.map(s => 
        ({
          name: s.staffs.name,
          lastName: s.staffs.lastName,
          cohorte: s.id,
          id: s.staffs.id
        })
      )
      console.log(data)
  }*/

    if(instructor){
      data= instructor.map(p => 
        ({
          name: p.name,
          lastName: p.lastName,
          mail: p.email,
          cohorte:p.cohorts[0].name,
          id: p.id
        })
      )
    }

    return (
      <div class="bg-dark" style = {style}>
        <h2 class="bg-dark text-warning text-center"> Instructores </h2>
        <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <button class="btn btn-outline-warning mb-2 mt-2 " onClick={() => getInstructor()}> Ver Todos </button>
        </div>
        <div class="bg-dark" style={{display:"flex", justifyContent:"center", marginTop: '3px'}}>
          <h6 class="text-light mt-2">Filtrar por cohorte: </h6>
          <div>
              {cohorts && cohorts.map((c) => (
                <button type="button" onClick={() => getCohortDetail(c.id)} class="btn btn-outline-warning ml-1 border-0" >{c.name}</button>
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
            {instructor ? instructor.map((u) => (
                <tr class="bg-light"> 
                  <td>{u.name}</td>
                  <td>{u.lastName}</td>
                  <td>{u.email}</td>
                  <td>{u.cohorts[0].name}</td>
                </tr>       
            )): cohorts ? cohorts.map(u => (
                    <tr class="bg-light"> 
                      <td>{u.name}</td>
                      <td>{u.lastName}</td>
                      <td>{u.email}</td>
                      <td>{u.cohortId}</td>
                    </tr> 
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
  instructor: state.instructor.instructor
 })

const mapDispatchToProps = dispatch => {
    return {
        getCohorts: () =>  dispatch(getCohorts()),
        getCohortDetail: (id) => dispatch(getCohortDetail(id)),
        getInstructor: () => dispatch(getInstructor())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListInstructors)