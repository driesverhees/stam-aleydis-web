import React, { Component } from 'react';
import MemberStore from '../data/memberStore';
import MemberDataManager from '../data/memberDataManager';
import * as LoadStates from '../data/utils/loadstates';

export default class AdminMemberEditForm extends Component {
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
        this.removeMemberListener = MemberStore.addListener(() => this.setState({allMembers: MemberStore.getState()})).remove;
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
                    componentState: LoadStates.LOADED,
                    firstName: memberData.firstName,
                    lastName: memberData.lastName
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

    saveChanges() {
        alert("TODO: save changes")
    }

    render() {
        if (this.state.componentState === LoadStates.LOADED) {
            return <div className="row">
                    <form className="col s12">
                        <div className="row">
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input placeholder="Placeholder" id="first_name" type="text" value={this.state.firstName} onChange={(evt) => this.setState({firstName: evt.target.value})} className="validate" />
                                <label htmlFor="first_name">Voornaam</label>
                            </div>
                            <div className="input-field col s6">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="last_name" type="text"  value={this.state.lastName} onChange={(evt) => this.setState({lastName: evt.target.value})} className="validate" />
                                <label htmlFor="last_name">Achternaam</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">mail</i>
                                <input id="email" type="email" className="validate" data-error="Gelieve een geldig e-mailadres in te vullen" />
                                <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12">
                                <a class="waves-effect waves-light btn" onClick={() => this.saveChanges()}><i class="material-icons left">send</i>Opslaan</a>
                            </div>
                        </div>
                    </form>
                    </div>;
        } else if (this.state.componentState === LoadStates.ERROR) {
            return "show error";
        }
        return "Loading member data for form";
    }
}