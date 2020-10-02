import React from 'react';
import soyhenry from '../images/soyhenry.jpeg';
import luciagentile from '../images/LuciaGentile.jpeg';
import sofiaLago from '../images/sofiLago.jpeg';
import agusGrimaldi from '../images/AgusGrimaldi.jpeg';

export  default function About() {
  

return (
  <div class="container" style={{margin:'auto', marginTop:'30px', display:'flex', justifyContent: 'space-around', width:"100%", }}>
    <div class="row" style={{width:"100%", height:"100% "}}>
        
        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={luciagentile} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Lucía Gentile</h2>
            <p style={{marginTop:"20px"}}>Desarrolladora Full Stack Web/Ingeniera en Telecomunicaciones.</p>
            <p>Nací en Montevideo, Uruguay en Septiembre de 1978. Estudié en Henry y formo parte del cohorte Wbft03.</p>

        </div>


        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={sofiaLago} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Sofía Lago</h2>
            <p style={{marginTop:"20px"}}>Desarrolladora Full Stack Web y estudiante de Nutrición, ya cursando la tésis.</p>
            <p>Nací en Bariloche, pero vivo en Buenos Aires desde hace 7 años. Comencé estudiando en Henry en el cohorte Wbpt02, pero luego me cambié para el Wbft03.</p>
           
        </div>

        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>

            <img src={agusGrimaldi} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Agustina Grimaldi</h2>
            <p style={{marginTop:"20px"}}>Desarrolladora Full Stack Web.</p>
            <p>Nací en Buenos Aires, Argentina. Formé parte del Webft03.</p>

        </div>

        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={soyhenry} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Dayamar Martinez</h2>
            <p style={{marginTop:"20px"}}>Desarrolladora Full Stack Web.</p>
            <p>Formo parte del Webft03.</p>
            
        </div>

        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={soyhenry} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Matías Galvan</h2>
            <p style={{marginTop:"20px"}}>Desarrollador Full Stack Web.</p>
            <p>Formo parte del Webft03.</p>
        </div>

        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={soyhenry} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}}/>

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Rodrigo Villarruel</h2>
            <p style={{marginTop:"20px"}}>Desarrollador Full Stack Web.</p>
            <p>Nací en San Pedro, Buenos Aires, Argentina. Formo parte del Webft03.</p>
        </div>

        <div class="col-lg-4" style={{margin:"auto", height: '70vh'}}>
                     
            <img src={soyhenry} style={{width:"160px", height:"160px", borderRadius:"50%", display: 'block', margin: 'auto'}} />

            <h2 style={{display:'flex', justifyContent: 'center', width:"100%"}}>Ezequiel Diaz</h2>
            <p style={{marginTop:"20px"}}>Desarrollador Full Stack Web.</p>
            <p>Formo parte del Webft03.</p>
        
        </div>
    </div>
  </div>
)
}