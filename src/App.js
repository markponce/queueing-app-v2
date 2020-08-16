import React from 'react';
// import logo from './logo.svg';
// import { Counter } from './features/counter/Counter';
import './App.css';
import './custom.scss';

import M from 'materialize-css/dist/js/materialize'

function App() {
  return (
    <div className="App">
        <a className="waves-effect waves-light btn" href="/#">button</a>
        <a onClick={()=> M.toast({html: 'I am a toast!'})} href="/#" className="btn">Toast!</a>
    </div>
  );
}

export default App;
