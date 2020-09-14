import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { makeStyles } from '@material-ui/core/styles';
import { getCohorts } from '../../actions/cohort';

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
}));

export function AllCohorts({getCohorts}){
   const [cohorts, setCohorts] = useState()
    const classes = useStyles()
    
    useEffect(()=>{
        getCohorts()
        .then(data => setCohorts(data.payload))    
    }, [])
    console.log(cohorts)
    return (
        <div> 
          {cohorts && cohorts.length === 0 ? (
        <div>
          <h4>
            {' '}
            No hay cohortes para mostrar
          </h4>
        </div>
      ) : (
        <div className={classes.paper} >
          <h3>Cohortes</h3>
          {cohorts &&
            cohorts.map(u => (
            <div  className={classes.paper}  key={u.id} > 
            <ListItemText primary={u.name + " " + u.startDate} />
            <Link to="/cohort" > ver detalles </Link>
            <hr/>
            </div>
            ))}
            </div>)}
      </div>
    )
}

const mapDispatchToProps = dispatch => ({
  getCohorts: () =>  dispatch(getCohorts())
})
    
export default connect(null, mapDispatchToProps)(AllCohorts)