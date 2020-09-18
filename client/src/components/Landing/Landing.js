import React from 'react';
import Login from "./Login.js" 

export  default function Landing() {
return (
  <div>
    <div>
      <h1>Bienvenido a HenryApp</h1>
      <h1>Ingrese su email con el que aplico.</h1>
    </div>
    {/* llamo al componente Login importado */}
    <div>
      <Login/>
    </div>
  </div>
)
}