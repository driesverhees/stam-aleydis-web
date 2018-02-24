import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MemberStore from '../data/memberStore';
import * as LoadStates from '../data/utils/loadstates';
import MemberEditForm from './memberEditForm';
import MembersOverview from './membersOverview'

class AdminMembers extends React.PureComponent {


  render() {
    return <Switch>
              <Route exact path='/admin/leden' component={MembersOverview}/>
              <Route path='/admin/leden/edit/:memberId' component={MemberEditForm}/>
            </Switch>
  }
}

export default AdminMembers;
