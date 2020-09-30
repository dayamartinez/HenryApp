import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getCohorts, getCohortDetail } from '../../actions/cohort';
import {GET_PM, promotePm} from '../../actions/pm'
import {getStudents} from '../../actions/student'
import swal from 'sweetalert'

export function CohortList({getCohorts, student, getCohortDetail, cohortDetail, promotePm, getStudents, style}){

    const [cohorts, setCohorts] = useState()
    const [pm, setPm] = useState()
    useEffect(()=>{        
        getCohorts().then(data => setCohorts(data.payload)) 
        getStudents().then(res => setPm(res.payload))
    }, [student])
   console.log(pm)

    //Busca el grupo al cual pertenece el alumno
    const buscarGrupo= (cohorte,grupoId)=>{
        let grupoName = "El alumno no tiene un grupo asignado"
        cohorte.groups.forEach(grupo => {
            if(grupoId==grupo.id){
                grupoName = grupo.name
            }
        })
        return grupoName
    }
    const orderById= (a,b) =>{
            if (a.id > b.id) {
              return 1;
            }
            if (a.id < b.id) {
              return -1;
            }
            // a must be equal to b
            return 0;
          }           

    return (
        <div class="bg-dark" style = {style}>
            <h2 class="bg-dark text-warning text-center"> Alumnos </h2>
        
        <div style={{display:"flex", alignItems:"center", justifyContent:"center", padding:"20px"}}>
        
            <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
                <button type="button" class="btn btn-outline-warning mb-2 mt-2" onClick={() => getCohorts()}>Ver Todos</button>
  
                <div class="btn-group dropright" role="group">
                    <button id="btnGroupDrop1" type="button" class="btn btn-outline-warning mb-2 mt-2 dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        Filtrar por Cohorte
                    </button>
                    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" role="menu">
                        {cohorts && cohorts.map((c) => (         
                            <a type="button" onClick={() => getCohortDetail(c.id)} class="dropdown-item">{c.name + " " +console.log(c)}</a>
                           
                            ))
                        }                         
                    </div>
                </div>
            </div>
        </div>


            <table class="table">
                <thead class="thead-dark">
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Cohorte</th>
                <th scope="col">Email</th>
                <th scope="col">Grupo</th>
                <th scope="col"></th>
                </tr>
                </thead>
                <tbody>
                {/* Si se selecciono un cohorte en particular, solo mostrara informacion de los alumnos del mismo,
                 */}
                {cohortDetail[0] ? cohortDetail.sort((a,b)=>orderById(a,b)).map((c) => (
                    c.usuarios.sort((a,b)=>orderById(a,b)).map(u => (
                       
                        <tr class="bg-light"> 
                        
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        {/* <td>{c.name}</td> */}
                        <td>{u.email}</td>
                        {/* <td>{buscarGrupo(c,u.groupId)}</td> */}
                        <td>{                               
                            <button onClick={()=> {
                            swal({
                                title: 'Promover',
                                text:
                                    '¿Seguro desea Promover este usuario a pm?',
                                icon: 'warning',
                                buttons: ['No', 'Si'],
                                dangerMode: true,
                            }).then(res =>
                                res
                                    ? promotePm(u)
                                    : null
                                   
                            )     
                        }}> promover a PM</button>}</td>
                        </tr> 
                    ))                         
                    //si no, se mostrara todos los alumnos de todos los cohortes  
                    )): pm ? pm.map(u => (
                        <tr class="bg-light"> 
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        
                        <td>{u.email}</td>
                        {/* <td>{buscarGrupo(c,u.groupId)}</td> */}
                        <td>{ u.PM !== null ? <img width={"30px"} height={"25px"} 
                        src="https://media-exp1.licdn.com/dms/image/C4E0BAQE2nmZshIwV9A/company-logo_200_200/0?e=2159024400&v=beta&t=2rZ7n-f_mLfkkqAxz0B8IVGTELeBH1VTHBm0naezmZw" /> :
                            <button onClick={()=> {
                            swal({
                                title: 'Promover',
                                text:
                                    '¿Seguro desea Promover este usuario a PM?',
                                icon: 'warning',
                                buttons: ['No', 'Si'],
                                dangerMode: true,
                            }).then((res) =>
                                res
                                    ? promotePm(u)
                                    : null
                            )                
                        }}>Promover a PM</button>}</td>
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
   student: state.pm.pms
  })
  
  const mapDispatchToProps = dispatch => ({
    getCohorts: () =>  dispatch(getCohorts()),
    getCohortDetail: (id) => dispatch(getCohortDetail(id)),
    promotePm: (pm) => dispatch(promotePm(pm)),
    getStudents: () => dispatch(getStudents())
  })

export default connect(mapStateToProps, mapDispatchToProps)(CohortList)