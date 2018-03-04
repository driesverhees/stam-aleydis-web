import * as Actions from './loginActions';
import AppDispatcher from './appDispatcher';
import LoginData from './objects/loginData';


let existingSession = false; // Put to FALSE if there is no existing session
let mockSession = new LoginData({sessionId: 12345}); 
let mockUserName = "test";
let mockPassword = "test12345";

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
        }, 100);
        return deferredObj.promise();
    },
    login(userName, password) {
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(loginData) {
            AppDispatcher.dispatch({
                type: Actions.LoginSuccess,
                loginData: loginData
            });
        });
        deferredObj.fail(function() {
            // The fail can be igored, as it does not require a store update
        });
        setTimeout(() => {
            if (userName === mockUserName && password === mockPassword) {
                deferredObj.resolve(mockSession);
            } else {
                deferredObj.reject();
            }
        }, 100);
        return deferredObj.promise();
    }
};

export default LoginDataManager;