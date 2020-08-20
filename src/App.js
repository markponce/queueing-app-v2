import React, { useEffect, useState } from 'react';
// import logo from './logo.svg';
import { Counter } from './features/counter/Counter';
// import './App.css';
// import './pages/Register'
// import M from 'materialize-css/dist/js/materialize'
// import Register from './pages/Register';
// import Login from './pages/Login';
import Queues from './features/queues/Queues'

function App() {

  return (
    <div className="App">
      {/* <Register/> */}
      {/* <Login/> */}
      <Queues />
    </div>
  );

}

export default App;
