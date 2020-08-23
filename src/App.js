import React from 'react';
import Queues from './features/queues/Queues'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Board from './features/board/Board';

function App() {

  return (
    <Router>
      <div className="App">
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/board">Board</Link>
          </li>
        </ul> */}
        <Switch>
          <Route exact path="/">
            <Queues />
          </Route>
          <Route path="/board">
            <Board />
          </Route>
        </Switch>
      </div>
    </Router>
  );

}

export default App;
