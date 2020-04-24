import React from 'react';
import './App.css';
import Flashcard from './Flashcard'; 
import Dictionnary from './Dictionnary'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

function App() {
  return ( <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Dictionnary</Link>
          </li>
          <li>
            <Link to="/flashcard">Flashcard game</Link>
          </li>
         
        </ul>
      </nav>

    
      <Switch>
        <Route path="/flashcard">
        <Flashcard nb="50"/>
        </Route>
        <Route path="/">
        <Dictionnary/>
        </Route>
      </Switch>
    </div>
  </Router>

  );
}

export default App;
