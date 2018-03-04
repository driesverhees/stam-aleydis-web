import * as Actions from './loginActions';
import {LoadObject, LoadObjectData} from './utils/loadobject';
import * as LoadStates from './utils/loadstates';
import {ReduceStore} from 'flux/utils';
import LoginDataManager from './loginDataManager';
import AppDispatcher from './appDispatcher';

class LoginStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  // LOADED = action performed + logged-on
  // ERROR = action performed but no data (=not logged-on)
  getInitialState() {
    return new LoadObject(() => AppDispatcher.dispatch({
      type: Actions.StartAutoLogin,
    }));
  }

  reduce(state, action) {
    switch (action.type) {
      case Actions.StartAutoLogin:
        LoginDataManager.loadLoginData();
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADING}));

      case Actions.LoginSuccess:
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADED, data: action.loginData}));

      case Actions.LoginError:
        return state.setLoadData(new LoadObjectData({state: LoadStates.ERROR}));

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