import * as Actions from './groupActions';
import Immutable from 'immutable';
import {LoadObject, LoadObjectData} from './utils/loadobject';
import * as LoadStates from './utils/loadstates';
import {ReduceStore} from 'flux/utils';
import GroupDataManager from './groupDataManager';
import AppDispatcher from './appDispatcher';

class GroupStore extends ReduceStore {
  constructor() {
    super(AppDispatcher);
  }

  getInitialState() {
    return new LoadObject(() => AppDispatcher.dispatch({
      type: Actions.StartLoad,
    }));
  }

  reduce(state, action) {
    switch (action.type) {
      case Actions.StartLoad:
        GroupDataManager.loadGroups();
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADING}));

      case Actions.Loaded:
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADED, data: Immutable.List(action.groups)}));

      case Actions.LoadError:
        alert("TODO: GROUP LOAD ERROR");
        return state;

      case Actions.Refresh:
        return this.getInitialState();
    }
    // No update of the state
    return state;
  }

}

export default new GroupStore();