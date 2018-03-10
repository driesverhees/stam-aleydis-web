import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import MemberEditForm from './memberEditForm';
import MemberCreateForm from './memberCreateForm';
import MembersOverview from './membersOverview'

class AdminMembers extends React.PureComponent {


  render() {
    return <div>
            <Switch>
              <Route exact path="/admin/members" component={MembersOverview}/>
              <Route path="/admin/members/create" component={MemberCreateForm}/>
              <Route path="/admin/members/edit/:memberId" component={MemberEditForm}/>
            </Switch>
            <div className="fixed-action-btn">
              <Link to="/admin/members/create" className="btn-floating btn-large">
                <i className="large material-icons">person_add</i>
              </Link>
            </div>
           </div>;
  }
}

export default AdminMembers;
