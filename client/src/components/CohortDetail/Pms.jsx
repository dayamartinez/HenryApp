import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getPm }  from '../../actions/pm'
import { getInstructor }  from '../../actions/instructor'
import {getCohortDetail} from '../../actions/cohort'
import { promoteStudent, setCohort }  from '../../actions/student'
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import HenryIcon from './../../images/henryUserIcon.jpg'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import swal from 'sweetalert'
import {useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: '36ch',
    backgroundColor: theme.palette.background.paper,
    marginBottom: "10px"
  },
  inline: {
    display: 'inline',
  },
  button: {
    display:'flex', 
    justifyContent:'center', 
    alignItems: 'center',
    backgroundColor: "rgb(33,33,33)",
    padding: '5px'
  },
  margin:{
      marginRight: "10px"
  }
}));


export function Pms({getPm, getInstructor, promoteStudent, getCohortDetail , match}) {

const [pms, setPms] = useState()
const [instructores, setInstructores] = useState()


const history = useHistory()
let id = match.params.id

  useEffect(() => {
      getPm()
      .then((data) => setPms(data.payload))
      getInstructor()
      .then((data) => setInstructores(data.payload))
  }, []) 
 
  const classes = useStyles();
  const instructor = instructores === [] ? [] : instructores && instructores.filter(i => i.cohortId == id)
  const pmfilter = pms === [] ? [] : pms && pms.filter(pm => pm.cohortId == id)
  

  return (
    <div className={classes.margin}>
        <div className={classes.root}>
            <div className={classes.button}>
                <h5 class="text-light">Instructor</h5>
            </div>
           
             { instructor === [] ? <img width={"310px"} height={"250px"} src={HenryIcon}></img> :
    	    <div>
            <img width={"310px"} height={"250px"} src={HenryIcon}></img>
            <div className={classes.button}>
            <h5 class="text-light">{instructor && instructor[0].name + ' ' + instructor[0].lastName}</h5>   
           </div> </div>}
        </div>
        <List className={classes.root}>
            <div className={classes.button}>
                <h5 class="text-light">Project Managers</h5>
                
            </div>
            {pmfilter === [] ? <div><p> No hay PM asignados</p></div>:  
            pmfilter && pmfilter.map((pm) => (
                <div >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={HenryIcon} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={pm.name + ' ' + pm.lastName}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {'Grupo ' + pm.groupId}
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <div style={{display:'flex', alignItems: 'center'}}>
                            <button value={pm.id} 
                                onClick={() => {
                                 promoteStudent(pm)
                                 swal('Este usuario ya no es PM','')
                                 .then(res =>{if(res){
                                    history.replace('/admin/cohorts')
                                 }else{
                                    return null
                                 }}) 
                                }}
                                class="btn btn-outline-light border-0 rounded" ><DeleteIcon style={{ color: "#000"}}/>
                            </button>
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List> 
    </div>

    )}


 
const mapDispatchToProps = (dispatch) => ({
   getPm: () => dispatch(getPm()),
   getInstructor: () => dispatch(getInstructor()),
   promoteStudent: (id) => dispatch(promoteStudent(id))
})
 
export default connect(null, mapDispatchToProps)(Pms)


