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
  color: 'secondary',
  children: <MailIcon />,
}
export function Home({user, getPostActive, postInactive}){
    const history = useHistory()
    const classes = useStyles();
    const [post, setPost] = useState()
    useEffect(()=> {
        if(1){
          getPostActive(1)
        .then(posts => setPost(posts.payload))   
        }   
    }, [])
    
  console.log(post)
    return (
        <div > 
            <div className={classes.root}>
               { post && post.length === 0 ?
               <button onClick={()=> {
                history.push('/cohortDetail/1')
            }}
               > <MailIcon /></button> :  
              <button onClick={()=> {
                  history.push('/cohortDetail/1')
                  post && post.map(p => postInactive(p, 1))         
              }}> <Badge badgeContent={post && post.length} {...defaultProps} /></button>}
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