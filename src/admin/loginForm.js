import React from 'react';
import LoginDataManager from '../data/loginDataManager';

export default class AdminLoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userName: "",
            password: "",
            enabled: true // Indicates if the form is enabled
        }
        this.submit = this.submit.bind(this);
    }

    submit() {
        this.setState({enabled: false}); // Disable the form
        LoginDataManager.login(this.state.userName, this.state.password);
    }

    render() {
        let submitDisabled = (!this.state.enabled || this.state.userName.length === 0 || this.state.password.length === 0);
        return  <div className="row">
                    <form className="col s12">
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
                            <div className="col s12">
                                <a className={"waves-effect waves-light btn " + (submitDisabled ? "disabled" : "")} onClick={() => this.submit()}><i className="material-icons left">send</i>Aanmelden</a>
                            </div>
                        </div>
                    </form>
                </div>;
    }
}