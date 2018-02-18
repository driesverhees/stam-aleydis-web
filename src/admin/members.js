import React, { Component } from 'react';
import MemberStore from '../data/memberStore';


class AdminMembers extends Component {
  componentDidMount() {
    let members = MemberStore.getState();

  }

  render() {
    return (
      <div>
        <table className="striped">
          <thead>
            <tr>
              <th>Voornaam</th>
              <th>Achternaam</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Jan</td>
              <td>Janssens</td>
            </tr>
            <tr>
              <td>Peter</td>
              <td>Peeters</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default AdminMembers;
