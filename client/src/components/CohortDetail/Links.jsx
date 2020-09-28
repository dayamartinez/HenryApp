// import React, {useState, useEffect} from 'react'
// import Grid from '@material-ui/core/Grid'
// import Paper from '@material-ui/core/Paper'
// import Typography from '@material-ui/core/Typography'
// import TextField from '@material-ui/core/TextField'
// import Divider from '@material-ui/core/Divider'
// import SendIcon from '@material-ui/icons/Send'
// import {addLink, deleteLink} from './../../actions/link'
// import {getCohortDetail} from './../../actions/cohort'
// import { connect } from 'react-redux';

// export function links({addLink, getCohortDetail, match}){

// const id = match.params.id
//   const [cohort, setCohort] = useState()
//   const [input, setInput] = useState({
//     name: '',
//     links: '',
//     module: ''
//   })
   
//     useEffect(() => {
//       getCohortDetail(id)
//       .then(data => setCohort(data.payload))
//     }, [])


//   const handleInputChange = (e) => {
//     setInput({
//       ...input,
//       [e.target.name]: e.target.value,
//     })
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     addLink(input.links, input.name, input.module, instructor.id, id)
//     }

//     const instructor = cohort && cohort[0].staffs[0] 
//     const linksC = cohort && cohort[0].links

//      return (
//         <div style={{marginTop: '15px'}} className="border border-light">
//             <div style={{display:'flex',justifyContent:'center', alignItems: 'center',  
//             backgroundColor: "rgb(33,33,33)", padding: '5.6px'}} >
//                  <h5 class="text-light">Clases grabadas</h5>
//                  {/* <button class="btn btn-outline-warning btn-sm  ml-2 ">Todas</button>
//                  <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-1</button>
//                  <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-2</button>
//                  <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-3</button>
//                  <button className='btn btn-outline-warning btn-sm ml-1 border-0'>M-4</button> */}
//             </div>
//             <div style={{width: "700px", height: "250px", overflowX:'hidden', overflowY:'scroll' }} >
//            <form onSubmit={handleSubmit} >

//                <div style={{marginTop:'10px',display:'flex', alignItems: 'center', justifyContent:'center'}}>
//                     <TextField variant="outlined"  label="Nombre" size="small"
//                     style={{ width: "211px"}} 
//                     name="name"
//                     value={input.name}
//                     onChange={handleInputChange}/>
//                     <TextField variant="outlined" type='number' size="small" label="Modulo" 
//                     style={{width: "85px", marginLeft:"6px"}}
//                     name="module"
//                     value={input.module}
//                     onChange={handleInputChange}/>
//                     <TextField variant="outlined"  fullWidth size="small" label="Link de la grabacion"
//                     style={{width: "300px", marginLeft: "6px"}}
//                      name="links"
//               value={input.links}
//               onChange={handleInputChange}/>
//                     <input  style={{marginLeft: '5px'}} type='submit' />
//                </div>
//                <hr/>
//            </form>
//            {linksC && linksC.map(l => (
//             <Paper key={l.id} style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
//               <Grid container spacing={2}>
//                 <Grid item xs={12} sm container>
//                   <Grid item xs container direction="column" spacing={2}>
//                     <Grid item xs>
//                       <Typography variant="body2">
//                   <a href={l.links}>{l.name + '-' + 'Modulo: ' + l.module}</a>
//                       </Typography>
//                     </Grid>
//                   </Grid>
//                   <Grid item>
//                     <Typography variant="subtitle1">X</Typography>
//                   </Grid>
//                 </Grid>
//               </Grid>
//             </Paper>
//            ))}
//             </div>
//         </div>
     
//     )
// }
// const mapDispatchToProps = (dispatch) => ({
//   addLink: (links, name, module, staffId, id) => dispatch(addLink(links, name, module, staffId, id)),
//   getCohortDetail: (id) => dispatch(getCohortDetail(id))
 
// })

// export default connect(null, mapDispatchToProps)(links)