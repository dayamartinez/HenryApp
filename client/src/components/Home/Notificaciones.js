import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import {IconButton}  from '@material-ui/core';
import UserCard from './SearchBar/userCards.js';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { getPostActive, postInactive} from '../../actions/posts.js';
import {useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    
  }));
const defaultProps = {
  color: "secondary",
  children: <MailIcon />,
 
}
export function Notificaciones({user, getPostActive, postInactive}){
    const history = useHistory()
    const classes = useStyles();
    const [post, setPost] = useState()
    useEffect(()=> {
        if(user.cohortId){
          getPostActive(user.cohortId)
        .then(posts => setPost(posts.payload))   
        }   
    }, [])
    
  console.log(post)
    return (
        <div > 
            <div className={classes.root}>
               { post && post.length === 0 ?
               <IconButton 
                    color="primary" 
                    onClick={()=> {
                    history.push(`/cohortDetail/${user.cohortId}`)
                    }}> 
                    <MailIcon/> 
                </IconButton> :  
              <IconButton 
                        color="primary" 
                        onClick={()=> {
                        history.push(`/cohortDetail/${user.cohortId}`)
                        post && post.map(p => postInactive(p, user.cohortId))         
                    }}>
                 <Badge badgeContent={post && post.length} {...defaultProps} />
              </IconButton>}
            </div>
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.user.user
  })
  
  const mapDispatchToProps = dispatch => ({
    getPostActive: (id) => dispatch(getPostActive(id)),
    postInactive: (post, id) => dispatch(postInactive(post, id))
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Notificaciones)