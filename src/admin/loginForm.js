import React from 'react';
import LoginDataManager from '../data/loginDataManager';
import ErrorContainer from '../utils/errorContainer';

export default class AdminLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            enabled: true, // Indicates if the form is enabled
            errorMessage: null
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.setState({enabled: false, errorMessage: null}); // Disable the form and clear the error message
        LoginDataManager.login(this.state.userName, this.state.password)
        .done(function() {
            // No need to do anything, as the loginStore should be updated and the parent component should hide the form
            // Form can remain disabled
        })
        .fail(() => {
            // Show error and enable the form again
            this.setState({enabled: true, errorMessage: "An error occurred"});
        });
    }

    render() {
        let submitDisabled = (!this.state.enabled || this.state.userName.length === 0 || this.state.password.length === 0);
        return  <div className="row">
                    <form className="col s12">
                        {this.state.errorMessage && <div className="row"><div className="col s12">
                                <ErrorContainer message={this.state.errorMessage} />
                            </div></div>}
                        <div className="row">
                            <div className="input-field col s12">
                                <i className="material-icons prefix">account_circle</i>
                                <input id="login_user_name" type="text" className="validate" value={this.state.userName} onChange={(evt) => this.setState({userName: evt.target.value})} />
                                <label htmlFor="login_user_name">User Name</label>
                            </div>
                            <div className="input-field col s12">
                                <i className="material-icons prefix">lock</i>
                                <input id="login_password" type="password"  value={this.state.password} onChange={(evt) => this.setState({password: evt.target.value})} />
                                <label htmlFor="login_password">Password</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col s12 center-align">
                                <a className={"waves-effect waves-light btn " + (submitDisabled ? "disabled" : "")} onClick={() => this.submit()}><i className="material-icons left">send</i>Aanmelden</a>
                            </div>
                        </div>
                    </form>
                </div>;
    }
}