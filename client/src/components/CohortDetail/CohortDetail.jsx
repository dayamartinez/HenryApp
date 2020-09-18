import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import Pms from './Pms.jsx'

export function CohortDetail({match}){

    return (
        <div >
            <Pms match={match}/>
        </div>
    )
}

const mapStateToProps = () => ({
   
  })
  
  const mapDispatchToProps = () => ({
    
  })

export default connect(mapStateToProps, mapDispatchToProps)(CohortDetail)