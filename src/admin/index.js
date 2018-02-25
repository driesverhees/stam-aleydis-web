import React, { Component } from 'react';
import { NavLink, Switch, Route } from 'react-router-dom';
import AdminMembers from './members.js';

class AdminIndex extends Component {
  componentDidMount() {
    /*window.$('ul#admin_nav_tabs').tabs({
      onShow: function() { 
        console.log("test"); 
      }
    });*/
  }

  render() {
    return (
      <div>
        <ul className="tabs_" id="admin_nav_tabs">
          <li className="tab col s3"><NavLink to="/admin" activeClassName="active">Index</NavLink></li>
          <li className="tab col s3"><NavLink to="/admin/members" activeClassName="active">Leden</NavLink></li>
        </ul>
        <Switch>
          <Route path='/admin/members' component={AdminMembers}/>
        </Switch>
      </div>
    );
  }
}

export default AdminIndex;
