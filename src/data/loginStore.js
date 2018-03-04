import * as Actions from './loginActions';
import Immutable from 'immutable';
import {LoadObject, LoadObjectData} from './utils/loadobject';
import * as LoadStates from './utils/loadstates';
import {ReduceStore} from 'flux/utils';
import LoginDataManager from './loginDataManager';
import AppDispatcher from './appDispatcher';

class LoginStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  // LOADED = action performed (does not mean that user is logged-on)
  // ERROR = an (unexpected) error occurred
  // If the user is not logged-on, then the data will be NULL (but state LOADED)
  getInitialState() {
    return new LoadObject(() => AppDispatcher.dispatch({
      type: Actions.StartAutoLogin,
    }));
  }

  reduce(state, action) {
    switch (action.type) {
      case Actions.StartLoad:
        LoginDataManager.loadLoginData();
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADING}));

      case Actions.LoginSuccess:
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADED, data: action.loginData}));

      case Actions.LoginError:
        return state.setLoadData(new LoadObjectData({state: LoadStates.FAILED}));

      case Actions.Refresh:
        return this.getInitialState();

      default:
        console.error("Unknown action in login store: " + action.type);
    }
    // No update of the state
    return null;
  }

}

export default new LoginStore();