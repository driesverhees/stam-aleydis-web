import React from 'react';
import PropTypes from 'prop-types';
import Group from '../data/objects/group';

export default class AdminGroupForm extends React.PureComponent {
    constructor(props) {
        super(props);
        let groupData = (props.group) ? props.group : new Group({})
        this.state = {
            id: groupData.id,
            name: groupData.name
        };
    }

    componentDidMount() {
        this.refreshInputFields();
    }

    componentDidUpdate() {
        this.refreshInputFields();
    }

    refreshInputFields() {
        if (window.Materialize.updateTextFields) {
            window.Materialize.updateTextFields();
        }
    }

    setChange(stateChanges) {
        if (this.props.onChange) {
            let newState = Object.assign({}, this.state, stateChanges);
            let newGroupData = new Group(newState);
            this.props.onChange(newGroupData);
        }
        this.setState(stateChanges);
    }

    submit() {
        if (this.props.onSubmit && !this.props.submitDisabled) {
            let groupData = new Group(this.state);
            this.props.onSubmit(groupData);
        }
    }

    render() {
        return <div className="row">
                <form className="col s12">
                    <div className="row">
                        <div className="input-field col s12">
                            <i className="material-icons prefix">group</i>
                            <input id="first_name" type="text" value={this.state.name} onChange={(evt) => this.setChange({name: evt.target.value})} className="validate" />
                            <label htmlFor="first_name">Naam</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 center-align">
                            <a className={"waves-effect waves-light btn " + (this.props.submitDisabled ? "disabled" : "")} onClick={() => this.submit()}><i className="material-icons left">send</i>Opslaan</a>
                        </div>
                    </div>
                </form>
               </div>;
    }
}

AdminGroupForm.propTypes = {
    group: PropTypes.group,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
    submitDisabled: PropTypes.bool
};
  
AdminGroupForm.defaultProps = {
    group: undefined,
    onChange: undefined,
    onSubmit: undefined,
    submitDisabled: false
};