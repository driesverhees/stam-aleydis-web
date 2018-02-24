import * as Actions from './memberActions';
import Immutable from 'immutable';
import {LoadObject, LoadObjectData} from './utils/loadobject';
import * as LoadStates from './utils/loadstates';
import {ReduceStore} from 'flux/utils';
import MemberDataManager from './memberDataManager';
import MemberDispatcher from './memberDispatcher';

class MemberStore extends ReduceStore {
  constructor() {
    super(MemberDispatcher);
  }

  getInitialState() {
    return new LoadObject(() => MemberDispatcher.dispatch({
      type: Actions.StartLoad,
    }));
  }

  reduce(state, action) {
    switch (action.type) {
      case Actions.StartLoad:
        MemberDataManager.loadMembers();
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADING}));

      case Actions.Loaded:
        return state.setLoadData(new LoadObjectData({state: LoadStates.LOADED, data: Immutable.List(action.members)}));

      case Actions.LoadError:
        return null;

      default:
        console.error("Unknown action in member store");
    }
  }

}

export default new MemberStore();