import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import {getPm} from '../../actions/pm'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function ListPM({getPm}){
    const [pm, setPm] = useState()
    const classes = useStyles()
    
    useEffect(()=>{
        getPm()
        .then(data => setPm(data.payload))     
    }, [])

    return (
        <div> 
          {pm && pm.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay Project Managers para mostrar
          </h4>
        </div>
      ) : (
        <div className={classes.paper} >
          <h3>Project Managers</h3>
          <ListItemText primary={'Nombre' + ' ' + 'Apellido' + ' ' + 'Cohorte'} />
          {pm &&
            pm.map(pm => (
            <div key={pm.id} > 
            <ListItem button>
            <ListItemText primary={pm.name + " " + pm.lastName + " " + pm.cohortId} />
            </ListItem>
            </div>
            ))}
            </div>)}
      </div>
    )
}

const mapDispatchToProps = dispatch => {
    return {
        getPm:() => dispatch(getPm())
    }
}
export default connect(null, mapDispatchToProps)(ListPM)