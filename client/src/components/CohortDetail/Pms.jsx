import React, {useState, useEffect} from 'react';
import { connect } from 'react-redux';
import { getPm, deletePM }  from '../../actions/pm'
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


export function Pms({getPm, getCohortDetail, deletePM, user , match}) {

const [cohort, setCohort] = useState()
const [pms, setPms] = useState()

const history = useHistory()
let id = match.params.id

  useEffect(() => {
      getPm()
      .then((data) => setPms(data.payload))
      getCohortDetail(id)
      .then((data) => setCohort(data.payload))
  }, []) 
 
  const classes = useStyles();
  const instructor = cohort && cohort[0].staffs[0] 

  /* console.log(cohort) */
  console.log(user)

  return (
    <div >
        <div className={classes.root}>
            <div className={classes.button}>
                <h5 class="text-light">Instructor</h5>
            </div>
           
             { instructor && instructor.length === 0 ? <img width={"310px"} height={"250px"} src={HenryIcon}></img> :
    	    <div>
            <img width={"310px"} height={"250px"} src={instructor ? instructor.urlImage : HenryIcon}></img>
            <div className={classes.button}>
            <h5 class="text-light">{instructor && instructor.name + ' ' + instructor.lastName}</h5>   
           </div> </div>}
        </div>
        <List className={classes.root}>
            <div className={classes.button}>
                <h5 class="text-light">Project Managers</h5>
                
            </div>
            {pms && pms.map((pm) => (
                <div >
                    <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={HenryIcon} />
                        </ListItemAvatar>
                        <ListItemText
                        primary={pm.usuario.name + ' ' + pm.usuario.lastName}
                        secondary={
                            <React.Fragment>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                {pm.group && pm.group.name}
                            </Typography>
                            </React.Fragment>
                        }
                        />
                        <div style={{display:'flex', alignItems: 'center'}}>
                        {user.user.rol !== 'user' ?
                            <button value={pm.id} 
                                onClick={() => {
                                 deletePM(pm.id)
                                 swal('Este usuario ya no es PM','')
                                 .then(res =>{if(res){
                                    history.go(0)
                                 }else{
                                    return null
                                 }}) 
                                }}
                                class="btn btn-outline-light border-0 rounded" ><DeleteIcon style={{ color: "#000"}}/>
                            </button>
                            : null}
                        </div>
                    </ListItem>
                    <Divider variant="inset" component="li" />
                </div>
            ))}
        </List> 
    </div>

    )}

const mapStateToProps = (state) => ({
    user: state.user
})
 
const mapDispatchToProps = (dispatch) => ({
   getPm: () => dispatch(getPm()),
   getCohortDetail: (id) => dispatch(getCohortDetail(id)),
   deletePM: (id) => dispatch(deletePM(id))
})
 
export default connect(mapStateToProps, mapDispatchToProps)(Pms)


