import React, { Component } from 'react';
import MemberStore from '../data/memberStore';
import * as LoadStates from '../data/utils/loadstates';
import { Link } from 'react-router-dom';

export default class AdminMembersOverview extends Component {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      members: MemberStore.getState()
    };
  }

  componentDidMount() {
    // Add listener to the member store. 
    // If a change happens, the getInitialState will be called again. 
    // This is sufficient since the initial state only contains the state from the member store
    this.removeMemberListener = MemberStore.addListener(() => this.setState({members: MemberStore.getState()})).remove;
  }

  componentWillUnmount() {
    // Remove the listener from the member store
    if (this.removeMemberListener) {
      this.removeMemberListener();
      this.removeMemberListener = null;
    }
  }

  render() {
    let membersData = this.state.members.getData();
    if (membersData.state === LoadStates.LOADED) {
      return (
        <div>
          <table className="striped">
            <thead>
              <tr>
                <th>Voornaam</th>
                <th>Achternaam</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                membersData.data.map((member) => {
                  return <tr key={"memberRow" + member.id}>
                          <td>{member.firstName}</td>
                          <td>{member.lastName}</td>
                          <td><Link to={"/admin/members/edit/"+member.id}>Edit</Link></td>
                         </tr>;
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else if (membersData.state === LoadStates.ERROR) {
      return "ERROR";
    } else {
      // Case of loading or none
      return "LOADING";
    }
  }
}
