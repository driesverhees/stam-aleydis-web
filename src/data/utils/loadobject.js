import Immutable from 'immutable';
import * as LoadStates from './loadstates';

export const LoadObjectData = Immutable.Record({
    state: LoadStates.NONE,
    data: undefined
});

export class LoadObject {
    constructor(loadFunc) {
        this._loadFunc = loadFunc;
        this._loadData = new LoadObjectData({state: LoadStates.NONE});
    }

    getData() {
        if (this._loadData.state === LoadStates.NONE) {
            // Not yet loaded, so start loading
            setTimeout(() => { this._loadFunc(); },0);
        }
        return this._loadData;
    }

    setLoadData(loadData) {
        if (loadData === this._loadData){
            return this;
        }
        let nextLoadObj = new LoadObject(this._loadFunc);
        nextLoadObj._loadData = loadData;
        return nextLoadObj;
    }
}