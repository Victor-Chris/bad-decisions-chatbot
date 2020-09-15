import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import Home from './components/Home';

import './App.css';

class App extends React.Component {
  render() {

    return (
      <div className="App">
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
            </Switch>
          </div>
        </Router>

      </div>
    );
  }
}

export default App;
