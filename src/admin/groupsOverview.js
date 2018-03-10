import React from 'react';
import GroupStore from '../data/groupStore';
import * as LoadStates from '../data/utils/loadstates';
import { Link } from 'react-router-dom';

export default class AdminGroupsOverview extends React.PureComponent {
  constructor(props) {
    super(props);
    // Set initial state
    this.state = {
      groups: GroupStore.getState()
    };
  }

  componentDidMount() {
    this.removeGroupListener = GroupStore.addListener(() => this.setState({groups: GroupStore.getState()})).remove;
  }

  componentWillUnmount() {
    if (this.removeGroupListener) {
      this.removeGroupListener();
      this.removeGroupListener = null;
    }
  }

  render() {
    // If no ID is selected, then show the overview
    let groupsData = this.state.groups.getData();
    if (groupsData.state === LoadStates.LOADED) {
      return (
        <div>
          <table className="striped">
            <thead>
              <tr>
                <th>Naam</th>
              </tr>
            </thead>
            <tbody>
              {
                groupsData.data.map((group) => {
                  return <tr key={"groupRow" + group.id}>
                          <td>{group.name}</td>
                         </tr>;
                })
              }
            </tbody>
          </table>
        </div>
      );
    } else if (groupsData.state === LoadStates.ERROR) {
      return "ERROR";
    } else {
      // Case of loading or none
      return "LOADING";
    }
  }
}
