import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getCohorts, getCohortDetail } from '../../actions/cohort';

export function CohortList({getCohorts, getCohortDetail, cohorts, cohortDetail, style}){

    useEffect(()=>{
        getCohorts()     

    },[])
    const buscarGrupo= (cohorte,grupoId)=>{
        var grupoName = "el aulumno no tiene un grupo asignado"
        cohorte.groups.forEach(grupo => {
            if(grupoId=grupo.id){
                grupoName = grupo.name
            }
        })
        return grupoName

    }
    return (
        <div class="bg-dark" style = {style}>
            <h2 class="bg-dark text-warning text-center"> Alumnos </h2>
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
                <th scope="col">Cohorte</th>
                <th scope="col">Grupo</th>
                </tr>
                </thead>
                <tbody>
                
                {cohortDetail.length ? cohortDetail.map((c) => (
                    c.usuarios.map(u => (
                        <tr class="bg-light"> 
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        <td>{c.name}</td>
                        <td>{buscarGrupo(c,u.grupoId)}</td>
                        </tr> 
                    ))   
                )): cohorts.map((c) => (
                    c.usuarios.map(u => (
                    <tr class="bg-light"> 
                    <td>{u.name}</td>
                    <td>{u.lastName}</td>
                    <td>{c.name}</td>
                    <td>{buscarGrupo(c,u.grupoId)}</td>
                    </tr> 
                    ))   
                ))
                }                
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
   cohorts: state.cohort.cohorts,
   cohortDetail: state.cohort.cohortDetail
  })
  
  const mapDispatchToProps = dispatch => ({
    getCohorts: () =>  dispatch(getCohorts()),
    getCohortDetail: (id) => dispatch(getCohortDetail(id))
  })

export default connect(mapStateToProps, mapDispatchToProps)(CohortList)