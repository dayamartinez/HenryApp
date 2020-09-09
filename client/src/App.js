import React from 'react';
import logo from './logo.svg';
import './App.css';
import { connect } from "react-redux";
import {Route} from 'react-router-dom';
// import {Redirect} from 'react-router';
import Landing from './components/Landing/Landing.js';
function App() {
  return (
    <div className="App">
       {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
         <p>
           Edit <code>src/App.js</code> and save to reload.
         </p>
         <a
           className="App-link"
           href="https://reactjs.org"
           target="_blank"
           rel="noopener noreferrer"
         >
           Learn React
         </a>
       </header> */}
    <Route  path='/'component={Landing} />
    </div>
  );
}

export default App;
