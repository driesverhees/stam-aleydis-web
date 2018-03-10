import React from 'react';
import GroupDataManager from '../data/groupDataManager';
import GroupForm from './groupForm';

export default class AdminGroupCreateForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newGroupData: null
        };
        this.createGroup = this.createGroup.bind(this);
    }

    createGroup(groupData) {
        let history = this.props.history;
        GroupDataManager.createGroup(groupData)
        .done(() => {
            history.push("/admin/groups")
        })
        .fail(function() {
            alert("ERROR saving group data");
        });
    }

    render() {
        return <GroupForm group={this.state.newGroupData} submitDisabled={false} onSubmit={this.createGroup} />;
    }
}