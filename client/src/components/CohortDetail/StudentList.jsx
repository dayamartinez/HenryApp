import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useHistory } from 'react-router-dom'
import { getCohorts,getCohortDetail,  getGroupDetail } from '../../actions/cohort';
import DeleteIcon from '@material-ui/icons/Delete'
import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'

export function StudentList({getCohorts, getGroupDetail, getCohortDetail, groups, match}) {
    let id = match.params.id
    const history = useHistory()
    const [cohortD, setCohortD] = useState()

  useEffect(() => {
    getCohortDetail(id)
    .then((data) => setCohortD(data.payload))
  }, []) 

  return (
    <div style={{width:"380px", height:"550px"}}>

        <h5 class="text-light text-center" style={{display: 'flex', backgroundColor:"rgb(33,33,33)", height:'42px', alignItems: 'center', justifyContent: 'center'}}> Alumnos </h5>

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
    <div style={{ maxHeight:"550px", overflowX:'hidden', overflowY:'scroll' }}>
        <table class="table">
            <thead class="thead-light small text-center">
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Grupo</th>
            <th scope="col"></th>
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
                <div style={{display:'flex', alignItems: 'center'}}>
                    <button  
                                /* onClick={() => {
                                 promoteStudent(pm)
                                 swal('Este usuario ya no es PM','')
                                 .then(res =>{if(res){
                                    history.replace('/admin/cohorts')
                                 }else{
                                    return null
                                 }}) 
                                }} */
                                class="btn btn-outline-light border-0 rounded" ><DeleteIcon style={{ color: "#000"}}/>
                            </button>
                        </div>
                    
                </tr> 
                
                ))
            }
            </tbody>
        </table>
    </div>
    <div  style={{marginTop:'10px', display:'flex', alignItems: 'center', justifyContent:'center'}}>
            <Button fullWidth  variant="contained" 
                onClick={() =>  history.push(`/cohort/${id}`) } >
                Modificar cohorte <SettingsIcon style={{marginLeft:'5px'}}/>
            </Button>
       
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


