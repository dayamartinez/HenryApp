import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import Typography from '@material-ui/core/Typography';
import { makeStyles} from '@material-ui/core/styles';
import UserCard from './SearchBar/userCards.js';
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import {useHistory } from 'react-router-dom'
import { getPosts} from '../../actions/posts.js';
import axios from 'axios'
import SendIcon from '@material-ui/icons/Send'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import HenryIcon from './../../images/henryUserIcon.jpg'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import {addPost, deletePost, addHomePost} from './../../actions/posts'
import {addLink, deleteLink} from './../../actions/link'
import {getCohortDetail} from './../../actions/cohort'
import { useRef } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    totalBackground: {
      marginRight: '90px',
      marginLeft: '90px',
      background: '#f5f5f6',
      maxHeight: '3000px',
      minHeight: '100px',
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
      Post: {
        maxHeight: '100px',
        minHeight: '80px',
        marginLeft: '20px',
        maxWidth: '800px'
      },
      userPic: {
        display: 'flex',
        marginLeft: '-8px',
        marginTop: '5px',
        border: '5px',
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      totalPost : {
        marginTop: '5px',
        marginRight: '10px',
        marginLeft: '10px',
        border: 'black 5px'
      },
      dividers: {
        color: 'gray'
      },
      delete: {
        marginRight: '10px',
        marginTop: '20px'
      },
      username: {
        font : '18px',
        fontWeight: '550',
      },
      General: {
        display:"flex",
        alignItems:"center",
        justifyContent:"center",
        padding:"20px",
        marginLeft: '330px'
      }
  }));
const defaultProps = {
  color: "secondary",
  children: <MailIcon style={{ color: "#000"}} />,
 
}

export function Home({addPost,instructor, deletePost, posts, match, user, staff}){
  // const id = match.params.id

    const history = useHistory()
    const classes = useStyles();
    const [post, setPost] = useState([])
    const [input, setInput] = useState({comments: ''})  
  
    
    const handleInputChange = (e) => {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      })
    }

  
    const handleChange = (e) => {
      setPost({
        ...post,
        [e.target.name]: e.target.value,
      })
    }
    const resetForm = () => {
      setInput({
        comments: ''
      })
    }
  
    const handleSubmit = (e) => {
      e.preventDefault()
      resetForm()
      addHomePost(input.comments, user.user.id, user.user.id)
    }

    
var posteos;
      useEffect(() => {
        fetch('http://localhost:3001/posts')
        .then(response => response.json())
          .then( post => {
            setPost(post)
    })
    .catch(error => {
        return error;
    })
}, [input, posts])
  

// useEffect(() => {
//   fetch('http://localhost:3001/posts')
//   .then(response => response.json())
//     .then( post => {
//       setPost(post)
// })
// .catch(error => {
//   return error;
// })
// }, [deletePost()])


console.log(post)
console.log(staff)
      return (

        <div className={classes. totalBackground}>
          <div >
           
            <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>     
            {user.user.rol !== 'user' ?
              <TextField 
                style={{width: '800px', margin: '5px',}}
                variant="outlined" placeholder='Envía un mensaje' 
                name="comments"
                value={input.comments}
                onChange={handleInputChange}
              /> :

                  <AppBar position="static" className={classes.appbar} >
                  <Toolbar variant="dense">
                    <Typography 
                        className={classes.General}
                        variant="h6"
                        color="inherit"
                    >
                      Novedades
                    </Typography>
                  </Toolbar>
                </AppBar>
                    }

            </form>   
                     
          
          </div>
            <Divider/>
            <div className={classes.totalPost}>
              {console.log(posteos)}
              <Divider orientation="vertical" flexItem />
              {post && post.map(c => ( 
              <Paper key={c.id}>
                <Grid className={classes.Post} container spacing={12}>
                  <Grid item xs={12} sm container>
                    <Grid item>
                      <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src={c.staff.urlImage} className={classes.userPic}/>
                      </ListItemAvatar>
                    </Grid>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography  gutterBottom className={classes.username}>
                          {c.staff && c.staff.name + ' ' + c.staff.lastName}
                        </Typography>
                        <Typography >
                          {c.comments}
                        </Typography>
                      </Grid>
                    </Grid>
                    { user.user.rol !== 'admin' ? 
                    <Grid item className={classes.delete}>
                      { user.user.rol !== 'user' ? 
                      <iconButton 
                      onClick={() => deletePost(c.id) } 
                        ><DeleteIcon style={{ color: "#000"}}/>
                      </iconButton>:null  
                      }
                    </Grid> : null 
                        }
                  </Grid>
                </Grid>
                <Divider/>
              </Paper>
              ))
              }
              
            </div>
            <Divider orientation="vertical" flexItem />
          
          </div>
       
      )
  }



  const mapStateToProps = (state) => ({
    posts : state.posts.posts,
    links: state.link.links,
    user: state.user,
    instructor: state.instructor,
    staff: state.staff
  })
  
  const mapDispatchToProps = (dispatch) => ({
    getPosts: (id) => dispatch(getPosts(id)),
    addHomePost: (post, userId, id) => dispatch(addHomePost(post, userId, id)),
    getCohortDetail: (id) => dispatch(getCohortDetail(id)),
    deletePost: (id) => dispatch(deletePost(id)),
    addLink: (links, name, module, staffId, id) => dispatch(addLink(links, name, module, staffId, id)),
    deleteLink: (id) => dispatch(deleteLink(id))
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)