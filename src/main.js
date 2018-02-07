import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import NotFound from './notfound.js';
import Home from './home.js';
import Admin from './admin/index.js';

class Main extends Component {
  render() {
    return (
      <main>
        <div className="container">
          <Switch>
            <Route exact path='/' component={Home}/>
            <Route path='/admin' component={Admin}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </main>
    );
  }
}

export default Main;
