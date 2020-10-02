import React from 'react';
import './App.css';
import { Router, Route, Switch } from 'react-router-dom';
import {history} from './healper/history';
import NavigationBar from './components/navigation'
import Signup from './components/signup'
import Login from './components/login'
import DashBoard from './components/dashboard'
import PrivateRoute from './components/privateroute'

function App() {
  return (
    <div className="App">
        <Router history={history}>
          <Switch>
            <Route  exact path="/signup" name="signup" component={(e) => { return <Signup/> }} />
            <PrivateRoute  path="/login" name="login" component={(e) => { return <Login/> }} />
            <PrivateRoute   path="/dashboard" name="dashboard" component={DashBoard} />
            <Route path="/" name="navigation" component={NavigationBar} />
          
          </Switch>
      </Router>
    </div>
  );
}

export default App;
