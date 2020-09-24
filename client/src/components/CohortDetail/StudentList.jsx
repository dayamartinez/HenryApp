import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import {useHistory } from 'react-router-dom'
import { getCohorts,getCohortDetail} from '../../actions/cohort';

import SettingsIcon from '@material-ui/icons/Settings'
import Button from '@material-ui/core/Button'

export function StudentList({getCohortDetail, match}) {
    let id = match.params.id
    const history = useHistory()
    const [cohortD, setCohortD] = useState()

  useEffect(() => {
    getCohortDetail(id)
    .then((data) => setCohortD(data.payload))
  }, []) 


  const usuarios = cohortD && cohortD[0].usuarios


  return (
    <div style={{width:"380px", height:"550px"}}>

        <h5 class="text-light text-center" style={{display: 'flex', backgroundColor:"rgb(33,33,33)", height:'42px', alignItems: 'center', justifyContent: 'center'}}> Alumnos </h5>


    <div style={{ maxHeight:"550px", overflowX:'hidden', overflowY:'scroll' }}>
        <table class="table">
            <thead class="thead-light small text-center">
            <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            </tr>
            </thead>
            <tbody>
            
            {usuarios && usuarios.map(u => (
           
            <tr class="bg-light text-dark small text-center" style={{height: '30px'}}> 
                <td>{u.name}</td>
                <td>{u.lastName}</td>   
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


       
const mapDispatchToProps = dispatch => ({
    getCohortDetail: (id) => dispatch(getCohortDetail(id))
})

 
export default connect(null, mapDispatchToProps)(StudentList)


