import React, {useState, useEffect} from 'react'
import SendIcon from '@material-ui/icons/Send'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import HenryIcon from './../../images/henryUserIcon.jpg'
import TextField from '@material-ui/core/TextField'

export default function send(){
 
    return (
        <div style={{width: "700px", height: "335px"  }} className="bg-light rounded-lg">
          <form style={{display: 'flex', alignItems: 'center', justifyContent:'center'}}>     
            <TextField style={{width: '550px', margin: '5px'}}
                  variant="outlined" placeholder='Envía un mensaje' />
            <SendIcon type='submit' />
          </form>
  
          <div  style={{flexGrow: 1, overflowX:'hidden', overflowY:'scroll' , height: "270px"  }}> 
            <Paper style={{padding: '2px',margin: '20px auto',maxWidth: 500}}>
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
                        Franco Etcheverri
                      </Typography>
                      <Typography variant="body2">
                        Chicos, la clase de autenticación se pasa para el martes 22/09. Nos vemos!!!
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
