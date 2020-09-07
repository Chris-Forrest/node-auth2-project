import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Signup from './components/Signup';
import PrivateRoute from './components/PrivateRoute';
import Login from './components/login';
import GetUsers from './components/getusers';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Node auth2 project</h1>
       
        <Link to="/signup">SignUp</Link>
        <Link to="/login">Login</Link>
        <Link to="/protected">Users List</Link>

      </header>
      <Switch>
        
        <PrivateRoute exact path="/protected" component={GetUsers} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />

      </Switch>
    </div>
    </Router>
  );
}

export default App;
