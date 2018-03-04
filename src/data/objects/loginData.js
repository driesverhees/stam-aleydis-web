import Immutable from 'immutable';

const LoginData = Immutable.Record({
    sessionId: 0,
    userName: ""
}, "LoginData");

export default LoginData;