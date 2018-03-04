import React from 'react';
import { Switch, Route } from 'react-router-dom';
import LoginForm from './loginForm';
import AdminMembers from './members';
import AdminCalendar from './calendar';
import LoginStore from '../data/loginStore';
import * as LoadStates from '../data/utils/loadstates';

class AdminIndex extends React.PureComponent {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      loginState: LoginStore.getState()
    };
  }

  componentDidMount() {
    this.removeLoginStoreListener = LoginStore.addListener(() => this.setState({loginState: LoginStore.getState()})).remove;
  }

  componentWillUnmount() {
    if (this.removeLoginStoreListener) {
      this.removeLoginStoreListener();
      this.removeLoginStoreListener = null;
    }
  }



  render() {
    let loginStateData = this.state.loginState.getData();
    // If it is loaded and the user is logged in, then show the admin page
    if (loginStateData.state === LoadStates.LOADED && loginStateData.data) { 
      return <div>
                <div className="section center-align">
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
    } else if (loginStateData.state === LoadStates.LOADING) {
      return <div>Signing in</div>;
    } else {
      return <div className="section"><LoginForm /></div>;
    }
  }

  getTabLink(link, label) {
    let isActive = this.props.location.pathname && this.props.location.pathname.toLowerCase().indexOf(link.toLowerCase()) !== -1;
    return <a href="#!" onClick={() => {
              this.props.history.push(link);
            }} className={isActive ? "active" : ""}>{label}</a>;
  }
}

export default AdminIndex;