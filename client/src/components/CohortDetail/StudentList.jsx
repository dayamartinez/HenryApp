import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useHistory } from 'react-router-dom'
import { getCohorts,getCohortDetail,  getGroupDetail } from '../../actions/cohort';



export function StudentList({getCohorts, getGroupDetail, getCohortDetail, groups, match}) {

  const [cohortD, setCohortD] = useState()

  useEffect(() => {
    getCohortDetail(match.params.id)
    .then((data) => setCohortD(data.payload))
  }, []) 

  console.log(cohortD)



  return (
    <div style={{width:"360px", height:"500px"}}>
        <div style={{backgroundColor:"rgb(33,33,33)"}}>
            <h5 class="text-light text-center" style={{display: 'flex', backgroundColor:"rgb(33,33,33)", height:'42px', alignItems: 'center', justifyContent: 'center'}}> Alumnos </h5>
        </div>
    {/* <div style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
        <button class="btn btn-outline-warning mb-2 mt-2 " onClick={() => getCohorts()}> Ver Todos </button>
    </div>
    <div style={{display:"flex", justifyContent:"center", marginTop: '3px', backgroundColor:"rgb(33,33,33)"}}>
        <h6 class="text-light mt-2">Filtrar por grupo: </h6>
        <div>
            {cohortD && cohortD[0].groups.map((g) => (
                   <button type="button" onClick={() => getGroupDetail(g.id)}class="btn btn-outline-warning ml-1 border-0" >{g.id}</button>
                ))
            } 
        </div>
    </div>  */}
    <div style={{ maxHeight:"500px", overflowX:'hidden', overflowY:'scroll' }}>
        <table class="table">
            <thead class="thead-light small text-center">
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Grupo</th>
            </tr>
            </thead>
            <tbody>
            
            {groups.length ? groups.map((c) => (
                    c.usuarios.map(u => (
                        <tr class="bg-light small text-center"> 
                        <td>{u.name}</td>
                        <td>{u.lastName}</td>
                        <td>{c.name}</td>
                        </tr> 
            ))))
            : 
            cohortD && cohortD[0].usuarios.filter(u => u.profile === "student").map(u => (
           
                <tr class="bg-light text-dark small text-center" style={{height: '30px'}}> 
                <td>{u.name}</td>
                <td>{u.lastName}</td>
                <td>{u.groupId}</td>
                </tr> 
                
                ))
            }
            
            
            </tbody>
        </table>
    </div>
</div>
    )}

const mapStateToProps = state => ({
    groups : state.cohort.groupsDetail
})
       
const mapDispatchToProps = dispatch => ({
    getCohorts: () =>  dispatch(getCohorts()),
    getCohortDetail: (id) => dispatch(getCohortDetail(id)),
    getGroupDetail: (id) => dispatch(getGroupDetail(id))
})

 
export default connect(mapStateToProps, mapDispatchToProps)(StudentList)


