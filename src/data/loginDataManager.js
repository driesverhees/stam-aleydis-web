import * as Actions from './loginActions';
import AppDispatcher from './appDispatcher';
import LoginData from './objects/loginData';


let existingSession = false; // Put to FALSE if there is no existing session
let mockSession = new LoginData({sessionId: 12345}); 

const LoginDataManager = {
    // Perform an auto-login where an existing open session will be used
    loadLoginData() {
        // Mock the ajax call
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(loginData) {
            AppDispatcher.dispatch({
                type: Actions.LoginSuccess,
                loginData: loginData
            });
        });
        deferredObj.fail(function() {
            AppDispatcher.dispatch({
                type: Actions.LoginError
            });
        });
        setTimeout(() => {
            if (existingSession) {
                deferredObj.resolve(mockSession);
            } else {
                deferredObj.reject();
            }
        }, 1000); // 1 sec for the ajax call
        return deferredObj.promise();
    },
    login(userName, password) {
        alert(userName + " ->" + password);
    }
};

export default LoginDataManager;