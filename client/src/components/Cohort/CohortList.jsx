import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getCohorts, getCohortDetail } from '../../actions/cohort';

export function CohortList({getCohorts, getCohortDetail}){

    const [cohorts, setCohorts] = useState()
    const [cohortsDetail, setCohortsDetail] = useState()

    useEffect(()=>{
        getCohorts()
        .then(data => setCohorts(data.payload))  
    }, [])
    console.log(cohorts)
    return (
        <div>
            <div class="bg-dark" style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
                <h6 class="text-light">Filtrar por cohorte: </h6>
                <div>
                    {cohorts && cohorts.map((c) => (
                        <button type="button" onClick={() => getCohortDetail(c.id)}class="btn btn-outline-warning ml-1 rounded-circle">{c.id}</button>
                     ))} 
                </div>
            </div> 
            <table class="table">
                <thead class="thead-dark">
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col">Apellido</th>
                <th scope="col">Cohorte</th>
                </tr>
                </thead>
                <tbody>
                
                {cohorts && cohorts.map((c) => (
                    <tr>
                    <td>{c.usuarios.name}</td>
                    <td>{c.usuarios.lastName}</td>
                    <td>{c.id}</td>
                    </tr>
                ))}
                
                
                </tbody>
            </table>
        </div>
    )
}

const mapStateToProps = (state) => ({
   
  })
  
  const mapDispatchToProps = dispatch => ({
    getCohorts: () =>  dispatch(getCohorts()),
    getCohortDetail: (id) => dispatch(getCohortDetail(id))
  })

export default connect(mapStateToProps, mapDispatchToProps)(CohortList)