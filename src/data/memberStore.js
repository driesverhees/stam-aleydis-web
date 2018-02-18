import type {Action} from './memberActions';
import Immutable from 'immutable';
import LoadObject from './utils/load_object/LoadObject';
import LoadObjectState from './utils/load_object/LoadObjectState';
import {ReduceStore} from 'flux/utils';
import MemberDataManager from './memberDataManager';
import MemberDispatcher from './memberDispatcher';

type State = LoadObjectState<Immutable.List<string>>;

class MemberStore extends ReduceStore<Action, State> {
  constructor() {
    super(MemberDispatcher);
  }

  getInitialState(): State {
    return new LoadObjectState(() => MemberDispatcher.dispatch({
      type: 'members/start-load',
    }));
  }

  reduce(state: State, action: Action): State {
    switch (action.type) {

      ///// Loading /////

      case 'members/start-load':
        alert("lets start loading");
        MemberDataManager.loadMembers();
        return state.setLoadObject(LoadObject.loading());

      case 'members/loaded':
        alert("it is loaded...");
        return state.setLoadObject(LoadObject.withValue(
          Immutable.List(action.members)
        ));

      case 'members/load-error':
        return state.setLoadObject(LoadObject.withError(action.error));

      default:
        console.error("Unknown action in member store");
    }
  }

}

export default new MemberStore();