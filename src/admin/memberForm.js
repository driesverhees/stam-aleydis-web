import React from 'react';
import PropTypes from 'prop-types';
import Member from '../data/objects/member';

export default class AdminMemberForm extends React.Component {
    constructor(props) {
        super(props);
        // Set initial state equal to all properties of the member object
        let memberData = (props.member) ? props.member : new Member({})
        this.state = {
            id: memberData.id, // This ID is not changes, it is kept in the state and therefore used when creating a new member object
            firstName: memberData.firstName,
            lastName: memberData.lastName,
            email: memberData.email
        };
    }

    componentDidMount() {
        this.refreshInputFields();
    }

    componentDidUpdate() {
        this.refreshInputFields();
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

    setChange(stateChanges) {
        // StateChange contains the state changes that are required to execute
        if (this.props.onChange) {
            // Since a state update is async, we need to create a tmp state object for building a new member object
            // This does not do a deep copy, but that is currently not required for the member object
            let newState = Object.assign({}, this.state, stateChanges);
            let newMemberData = new Member(newState);
            this.props.onChange(newMemberData);
        }
        this.setState(stateChanges);
    }

    submit() {
        if (this.props.onSubmit && !this.props.submitDisabled) {
            // Replace null by member data from the state
            let memberData = new Member(this.state);
            this.props.onSubmit(memberData);
        }
    }

    render() {
        return <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12 m6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="first_name" type="text" value={this.state.firstName} onChange={(evt) => this.setChange({firstName: evt.target.value})} className="validate" />
                            <label htmlFor="first_name">Voornaam</label>
                        </div>
                        <div className="input-field col s12 m6">
                            <i className="material-icons prefix">account_circle</i>
                            <input id="last_name" type="text"  value={this.state.lastName} onChange={(evt) => this.setChange({lastName: evt.target.value})} className="validate" />
                            <label htmlFor="last_name">Achternaam</label>
                        </div>
                        <div className="input-field col s12">
                            <i className="material-icons prefix">mail</i>
                            <input id="email" type="email" value={this.state.email}  onChange={(evt) => this.setChange({email: evt.target.value})} className="validate" data-error="Gelieve een geldig e-mailadres in te vullen" />
                            <label htmlFor="email">Email</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                            <a className={"waves-effect waves-light btn " + (this.props.submitDisabled ? "disabled" : "")} onClick={() => this.submit()}><i className="material-icons left">send</i>Opslaan</a>
                        </div>
                    </div>
                </form>
               </div>;
    }
}

AdminMemberForm.propTypes = {
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitDisabled: PropTypes.bool
};
  
AdminMemberForm.defaultProps = {
    onChange: undefined,
    onSubmit: undefined,
    submitDisabled: false
};