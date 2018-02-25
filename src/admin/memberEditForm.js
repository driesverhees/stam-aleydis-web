import React from 'react';
import MemberStore from '../data/memberStore';
import MemberDataManager from '../data/memberDataManager';
import * as LoadStates from '../data/utils/loadstates';
import MemberForm from './memberForm';

export default class AdminMemberEditForm extends React.Component {
    constructor(props) {
        super(props);
        // Set initial state
        this.state = {
            id: this.getMemberIdFromProps(props),
            componentState: LoadStates.NONE,
            allMembers: MemberStore.getState()
        };
    }

    getMemberIdFromProps(props) {
        // ID is specified as property
        if (props.id) {
            return props.id;
        }
        // ID is specified as part of the URL
        if (props.match.params.memberId) {
            return parseInt(props.match.params.memberId,10);
        }
        return null;
    }

    componentDidMount() {
        this.removeMemberListener = MemberStore.addListener(() => this.setState({
            allMembers: MemberStore.getState(),
            componentState: LoadStates.NONE // This will refresh the page (note that the store will also emit an event if something in the list has changed, even irrevelant (and then the local changes will be lost))
        })).remove;
        this.loadMemberData();
        this.refreshInputFields();
    }

    componentDidUpdate() {
        this.loadMemberData();
        this.refreshInputFields();
    }

    componentWillUnmount() {
        if (this.removeMemberListener) {
            this.removeMemberListener();
            this.removeMemberListener = null;
        }
    }

    loadMemberData() {
        // If the data has already been loaded, not required to reload
        if (this.state.componentState === LoadStates.LOADED || this.state.componentState === LoadStates.ERROR) {
            return;
        }
        let allMembersData = this.state.allMembers.getData();
        if (allMembersData.state === LoadStates.LOADED) {
            let memberData = allMembersData.data.find((mem) => mem.id === this.state.id);
            if (memberData) {
                this.setState({
                    originalMemberData: memberData,
                    componentState: LoadStates.LOADED,
                });
            } else {
                this.setState({componentState: LoadStates.ERROR});
            }
        } else if (allMembersData.state === LoadStates.ERROR) {
            this.setState({componentState: LoadStates.ERROR});
        } else if (this.state.componentState !== LoadStates.LOADING) {
            // Only update the state, if the component is not loading yet
            this.setState({componentState: LoadStates.LOADING});
        }
    }

    refreshInputFields() {
        // The updateTextFields methods is only defined once the document is fully loaded
        // See code: https://github.com/Dogfalo/materialize/blob/v1-dev/js/forms.js
        // Not an issue here, since it is called also after the document has loaded
        // But it can also be trigger before document is loaded (if the user goes straight to this page using the url), 
        // therefore check if the function exists
        if (window.Materialize.updateTextFields) {
            window.Materialize.updateTextFields();
        }
    }

    saveChanges(memberData) {
        // Ask the data manager to update the member
        MemberDataManager.updateMember(memberData)
        .done(function() {
            // No action required on done, since the store will emit the change
            // Maybe later, we want to show a successful message
        })
        .fail(function() {
            alert("ERROR saving member data");
        });
    }

    render() {
        if (this.state.componentState === LoadStates.LOADED) {
            return <MemberForm member={this.state.originalMemberData} onSubmit={this.saveChanges} />
        } else if (this.state.componentState === LoadStates.ERROR) {
            return "show error";
        }
        return "Loading member data for form";
    }
}