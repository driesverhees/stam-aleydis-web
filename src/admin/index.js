import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AdminMembers from './members.js';
import AdminCalendar from './calendar.js';

class AdminIndex extends React.PureComponent {
  render() {
    return <div>
              <div className="section">
                <ul className="tabs" id="admin_nav_tabs">
                  <li className="tab col s3">{this.getTabLink("/admin/start","Start")}</li>
                  <li className="tab col s3">{this.getTabLink("/admin/members","Leden")}</li>
                  <li className="tab col s3">{this.getTabLink("/admin/calendar","Kalender")}</li>
                </ul>
              </div>
              <div className="section">
                <Switch>
                  <Route path='/admin/members' component={AdminMembers}/>
                  <Route path='/admin/calendar' component={AdminCalendar}/>
                </Switch>
              </div>
            </div>;
  }

  getTabLink(link, label) {
    let isActive = this.props.location.pathname && this.props.location.pathname.toLowerCase().indexOf(link.toLowerCase()) !== -1;
    return <a href="#!" onClick={() => {
              this.props.history.push(link);
            }} className={isActive ? "active" : ""}>{label}</a>;
  }
}

export default AdminIndex;