import React from 'react';
import MemberDataManager from '../data/memberDataManager';
import MemberForm from './memberForm';

export default class AdminMemberEditForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newMemberData: null
        };
        this.createUser = this.createUser.bind(this);
    }

    createUser(memberData) {
        let history = this.props.history;
        // Ask the data manager to update the member
        MemberDataManager.createMember(memberData)
        .done(() => {
            // No action required on done, since the store will emit the change
            // Maybe later, we want to show a successful message
            history.push("/admin/members")
        })
        .fail(function() {
            alert("ERROR saving member data");
        });
    }

    render() {
        return <MemberForm member={this.state.newMemberData} submitDisabled={false} onSubmit={this.createUser} />;
    }
}