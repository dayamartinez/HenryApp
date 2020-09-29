import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import {getInstructor} from '../../actions/instructor'
import {yellow, grey} from "@material-ui/core/colors"


export function ListInstructors({getInstructor, cohorts, cohortDetail, style, getCohorts, getCohortDetail}){
    const [instructor, setInstructor] = useState()
    const yellowText = {color:yellow[500]}

    useEffect(()=>{
      getInstructor()
      .then(data => setInstructor(data.payload))
    }, [])

        
    return (
      <div class="bg-dark" style = {style}>
        {instructor && instructor.length === 0 ? (
        <div>
          <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}>
            {' '}
            No hay Instructores para mostrar
          </h2>
        </div>
        ) : (
        <div> 
          <h2 class="bg-dark text-warning text-center" style={{padding: '20px'}}> Instructores </h2>
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
                    <td>{u.cohorts[0] ? u.cohorts[0].name : null}</td>
                  </tr>       
              )): cohorts ? cohorts.map(u => (
                      <tr class="bg-light"> 
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        <td>{u.email}</td>
                        <td>{u.cohortId}</td>
                      </tr> 
                )) : null}                
            </tbody>
          </table>
        </div>
        )}
      </div>
    )
}

const mapStateToProps = (state) => ({
  instructor: state.instructor.instructor
 })

const mapDispatchToProps = dispatch => {
    return {
      getInstructor: () => dispatch(getInstructor())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ListInstructors)