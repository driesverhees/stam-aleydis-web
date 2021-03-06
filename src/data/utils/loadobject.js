import Immutable from 'immutable';
import * as LoadStates from './loadstates';

export const LoadObjectData = Immutable.Record({
    state: LoadStates.NONE,
    data: undefined
});

export class LoadObject {
    /**
     * @param {function} loadFunc - Action to trigger a load action
     * @param {function} shouldLoadFunc - Function to check if a load action should be triggered, the loadData is an input
     */
    constructor(loadFunc, shouldLoadFunc) {
        this._loadFunc = loadFunc; // Action to trigger a load action
        this._shouldLoadFunc = shouldLoadFunc || ((loadData) =>  loadData.state === LoadStates.NONE)
        this._loadData = new LoadObjectData({state: LoadStates.NONE});
        this._startedLoading = false; // Avoid that a load is trigger multiple times
    }

    getData(inputData) {
        if (!this._startedLoading && this._shouldLoadFunc(this._loadData)) {
            // Not yet loaded, so start loading
            this._startedLoading = true;
            setTimeout(() => { 
                this._loadFunc(inputData); 
                this._startedLoading = false;
            },0);
        }
        return this._loadData;
    }

    setLoadData(loadData) {
        if (loadData === this._loadData){
            return this;
        }
        let nextLoadObj = new LoadObject(this._loadFunc, this._shouldLoadFunc);
        nextLoadObj._loadData = loadData;
        return nextLoadObj;
    }
}