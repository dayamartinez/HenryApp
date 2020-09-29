import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import UserCard from './SearchBar/userCards.js';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import { getPostActive, postInactive} from '../../actions/posts.js';
import {useHistory } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
    totalBackground: {
      marginRight: '40px',
      marginLeft: '40px',
      background: '#f5f5f6',
      height: '1000px',
      border: 'solid',
      borderColor: 'darkgray'
    },
    tabcontainer: {
        justifyContent: 'flex-start',
        height: '50px',
    },
    root: {
        '& > *': {
          margin: theme.spacing(2),
        },
      },
  }));
const defaultProps = {
  color: "secondary",
  children: <MailIcon style={{ color: "#000"}} />,
 
}
export function Home({user, getPostActive, postInactive}){
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
               <button className="btn btn-outline-light border-0 rounded ml-1"
                onClick={()=> {
                history.push(`/cohortDetail/${user.cohortId}`)
            }}> <MailIcon  style={{ color: "#000"}} /> </button> :  
              <button className="btn btn-outline-light border-0 rounded ml-1" 
                  onClick={()=> {
                  history.push(`/cohortDetail/${user.cohortId}`)
                  post && post.map(p => postInactive(p, user.cohortId))         
              }}>
                 <Badge style={{ color: "#000"}} badgeContent={post && post.length} {...defaultProps} />
              </button>}
            </div>
                <div className={classes.totalBackground}>  
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
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)