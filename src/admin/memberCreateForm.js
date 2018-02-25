import React from 'react';
import MemberDataManager from '../data/memberDataManager';
import * as LoadStates from '../data/utils/loadstates';
import MemberForm from './memberForm';

export default class AdminMemberEditForm extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            newMemberData: null
        };
    }

    createUser(memberData) {

        alert(memberData.firstName);
    }

    render() {
        return <MemberForm member={this.state.newMemberData} submitDisabled={true} onSubmit={this.createUser} />;
    }
}