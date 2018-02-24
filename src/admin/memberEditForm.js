import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { NavLink, Switch, Route } from 'react-router-dom';
import MemberStore from '../data/memberStore';
import * as LoadStates from '../data/utils/loadstates';

export default class AdminMemberEditForm extends Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            id: parseInt(props.match.params.memberId,10),
            allMembers: MemberStore.getState()
        };
    }

    componentDidMount() {
        this.removeMemberListener = MemberStore.addListener(() => this.setState({members: MemberStore.getState()})).remove;
    }
    
    componentWillUnmount() {
        if (this.removeMemberListener) {
            this.removeMemberListener();
            this.removeMemberListener = null;
        }
    }

    render() {
        let allMembersData = this.state.allMembers.getData();
        if (allMembersData.state === LoadStates.LOADED) {
            let memberData = allMembersData.data.find((mem) => mem.id === this.state.id);
            if (memberData) {
                return "found -> " + memberData.firstName;
            }
            return "member not found";
        } else if (allMembersData.state === LoadStates.ERROR) {
            return "show error";
        }
        return "Loading member data for form";
    }
}