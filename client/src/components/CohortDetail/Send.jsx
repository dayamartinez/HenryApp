import React, {useState, useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import HenryIcon from './../../images/henryUserIcon.jpg'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import {addPost, deletePost} from './../../actions/posts'
import {addLink, deleteLink} from './../../actions/link'
import {getCohortDetail} from './../../actions/cohort'
import { connect } from 'react-redux';
import {useHistory } from 'react-router-dom'

export function Send({addPost, getCohortDetail, deletePost, addLink, posts, links, deleteLink, match, user }){
 
  const id = match.params.id
  const [cohort, setCohort] = useState()
  const history = useHistory()
  const [input, setInput] = useState({comments: ''})
  const [inputLink, setInputLink] = useState({
    name: '',
    links: '',
    module: ''
  })     

  useEffect(() => {
    getCohortDetail(id)
    .then(data => setCohort(data.payload))
  }, [posts, links])

  console.log(cohort)
  
  const instructor = cohort && cohort[0].staffs[0] 
  const comments = cohort && cohort[0].posts.sort((a,b) => (
  b.id - a.id))
  const linksC = cohort && cohort[0].links.sort((a,b) => (
  b.id - a.id))
  

  const handleInputChangeL = (e) => {
    setInputLink({
      ...inputLink,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmitL = (e) => {
    e.preventDefault()
    resetFormL()
    addLink(inputLink.links, inputLink.name, inputLink.module, instructor.id, id)
    }

  const handleInputChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  const resetFormL = () => {
		setInputLink({
      name: '',
      links: '',
      module: ''
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
    addPost(input.comments, instructor.id, id)
  }


    return (
      <div>
        <div style={{width: "700px", height: "335px"  }} className="bg-light rounded-lg">
          <form onSubmit={handleSubmit} style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>     
            <TextField 
              style={{width: '550px', margin: '5px'}}
              variant="outlined" placeholder='Envía un mensaje' 
              name="comments"
              value={input.comments}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-light border-0 rounded ml-1" type='submit'>
              <SendIcon style={{ color: "#000"}}/> 
            </button>
          </form> : null          
        
  
          <div  style={{flexGrow: 1, overflowX:'hidden', overflowY:'scroll' , height: "270px"  }}> 
            {comments && comments.map(c => ( 
            <Paper key={c.id} style={{padding: '2px',margin: '20px auto',maxWidth: 500}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item>
                    <ListItemAvatar>
                      <Avatar alt="Remy Sharp" src={HenryIcon} />
                    </ListItemAvatar>
                  </Grid>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="subtitle2" gutterBottom>
                        {instructor && instructor.name + ' ' + instructor.lastName}
                      </Typography>
                      <Typography variant="body2">
                        {c.comments}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    { user.user.rol !== 'user' ? 
                    <button class="btn btn-outline-light border-0 rounded" onClick={() => {deletePost(c.id) 
                      history.go(0)} } 
                      variant="subtitle1"><DeleteIcon style={{ color: "#000"}}/>
                    </button>:null  
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            ))
            }
            
          </div>
        </div>
        
        <div style={{marginTop: '15px'}} className="border border-light">
            <div style={{display:'flex',justifyContent:'center', alignItems: 'center',  
            backgroundColor: "rgb(33,33,33)", padding: '5.6px'}} >
                 <h5 class="text-light">Clases grabadas</h5>
                 {/* <button class="btn btn-outline-warning btn-sm  ml-2 ">Todas</button>
                 <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-1</button>
                 <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-2</button>
                 <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-3</button>
                 <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-4</button> */}
            </div>
            <div style={{width: "700px", height: "250px", overflowX:'hidden', overflowY:'scroll' }} >
           <form onSubmit={handleSubmitL} >

               <div style={{marginTop:'10px',display:'flex', alignItems: 'center', justifyContent:'center'}}>
                    <TextField variant="outlined"  label="Nombre" size="small"
                    style={{ width: "211px"}} 
                    name="name"
                    value={inputLink.name}
                    onChange={handleInputChangeL}/>
                    <TextField variant="outlined" type='number' size="small" label="Modulo" 
                    style={{width: "85px", marginLeft:"6px"}}
                    name="module"
                    value={inputLink.module}
                    onChange={handleInputChangeL}/>
                    <TextField variant="outlined"  fullWidth size="small" label="Link de la grabacion"
                    style={{width: "300px", marginLeft: "6px"}}
                     name="links"
              value={inputLink.links}
              onChange={handleInputChangeL}/>
                    <button className="btn btn-outline-light border-0 rounded ml-1" type='submit'>
                      <SendIcon style={{ color: "#000"}}/> 
                    </button>

               </div>
               <hr/>
           </form>
           {linksC && linksC.map(l => (
            <Paper key={l.id} style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2">
                      <a href={l.links}>{`${l.name} - Modulo: ${l.module}`}</a>
                      </Typography>
                    </Grid>
                  </Grid>
                   <Grid item>
                    <button class="btn btn-outline-light border-0 rounded" onClick={() => {
                      deleteLink(l.id)
                      history.go(0)}}><DeleteIcon style={{ color: "#000"}}/></button>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
           ))}
            </div>
        </div>
        </div>
     
    )
}

const mapStateToProps = (state) => ({
  posts : state.posts.posts,
  links: state.link.links,
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  addPost: (post, userId, id) => dispatch(addPost(post, userId, id)),
  getCohortDetail: (id) => dispatch(getCohortDetail(id)),
  deletePost: (id) => dispatch(deletePost(id)),
  addLink: (links, name, module, staffId, id) => dispatch(addLink(links, name, module, staffId, id)),
  deleteLink: (id) => dispatch(deleteLink(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(Send)