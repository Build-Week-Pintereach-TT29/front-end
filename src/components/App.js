import React from 'react';
import { Route, Switch } from 'react-router-dom'
import '../App.css';
import Registration from './Registration'
import NavBar from './NavBar'
import HomePage from './Home'


function App() {

  return (

    <div className="App">
        <NavBar />
        <Switch>
        <Route path='/Registration' component={Registration}>
        <Registration/>
        </Route>
        <Route path='/'>
        <HomePage />
        </Route>
        </Switch>
    </div>

  );
}

export default App;
