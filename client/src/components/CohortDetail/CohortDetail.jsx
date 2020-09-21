import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Pms from './Pms.jsx'
import StudentList from './StudentList'

export function CohortDetail({match}){

    return (
        <div style={{display:'flex', direction:'row', justifyContent:"space-between", padding:'20px'}} >
            <div><Pms match={match}/></div>
            <div></div>
            <div><StudentList match={match}/></div>
        </div>
    )
}

const mapStateToProps = () => ({
   
  })
  
  const mapDispatchToProps = () => ({
    
  })

export default connect(mapStateToProps, mapDispatchToProps)(CohortDetail)