import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MemberEditForm from './memberEditForm';
import MemberCreateForm from './memberCreateForm';
import GroupsOverview from './groupsOverview'

class AdminGroups extends React.PureComponent {


  render() {
    return <div>
            <Switch>
              <Route exact path="/admin/groups" component={GroupsOverview}/>
              <Route path="/admin/groups/create" component={MemberCreateForm}/>
            </Switch>
            <div className="fixed-action-btn">
              <Link to="/admin/groups/create" className="btn-floating btn-large">
                <i className="large material-icons">group_add</i>
              </Link>
            </div>
           </div>;
  }
}

export default AdminGroups;
