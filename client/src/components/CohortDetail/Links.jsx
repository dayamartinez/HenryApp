import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import SendIcon from '@material-ui/icons/Send'

export default function links(){
     return (
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
           <form>

               <div style={{marginTop:'10px',display:'flex', alignItems: 'center', justifyContent:'center'}}>
                    <TextField variant="outlined"  label="Nombre" size="small"
                    style={{ width: "211px"}}/>
                    <TextField variant="outlined" type='number' size="small" label="Modulo" 
                    style={{width: "85px", marginLeft:"6px"}}/>
                    <TextField variant="outlined"  fullWidth size="small" label="Link de la grabacion"
                    style={{width: "300px", marginLeft: "6px"}}/>
                    <SendIcon style={{marginLeft: '5px'}} type='submit' />
               </div>
               <hr/>
           </form>
            <Paper style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2">
                       <a href="https://vimeo.com/soyhenry/review/435789227/ee137c4f4b?sort=lastUserActionEventDate&direction=desc">React Intro</a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">X</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2">
                       <a href="https://vimeo.com/soyhenry/review/438241783/c708cf58e7?sort=lastUserActionEventDate&direction=desc">Redux Intro</a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">X</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2">
                       <a href="https://vimeo.com/soyhenry/review/445243471/381a52d4e9?sort=lastUserActionEventDate&direction=desc">Sequelize</a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">X</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            <Paper style={{padding: '2px',margin: '20px auto',maxWidth: 300}}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm container>
                  <Grid item xs container direction="column" spacing={2}>
                    <Grid item xs>
                      <Typography variant="body2">
                       <a href="https://vimeo.com/soyhenry/review/445243471/381a52d4e9?sort=lastUserActionEventDate&direction=desc">Taller de SCRUM</a>
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle1">X</Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
            </div>
        </div>
     
    )
}