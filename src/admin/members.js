import React, { Component } from 'react';

class AdminMembers extends Component {
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
