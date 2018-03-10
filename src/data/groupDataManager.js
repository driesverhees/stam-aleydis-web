import * as Actions from './groupActions';
import AppDispatcher from './appDispatcher';
import Group from './objects/group';

let mockGroupData = [
    new Group({id: 21, name: "Group1"}),
    new Group({id: 24, name: "Group2"})
];

const MemberDataManager = {
    loadGroups() {
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(groupData) {
            AppDispatcher.dispatch({
                type: Actions.Loaded,
                groups: groupData
              });
        });
        setTimeout(() => {
            deferredObj.resolve(mockGroupData)
        }, 100);
        return deferredObj.promise();
      },

      createGroup(groupData) {
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(newGroupData) {
            // For now, trigger a refresh of the store
            AppDispatcher.dispatch({
                type: Actions.Refresh
            });              
        });
        setTimeout(() => {
            let newMockGroupId = Math.floor(Math.random() * 100000000); // Random number between 0 and 1e8
            let newGroupObj = groupData.set("id", newMockGroupId);
            mockGroupData.push(newGroupObj);
            deferredObj.resolve(newGroupObj);
        }, 100);
        // Return the promise object
        return deferredObj.promise();
      }
};

export default MemberDataManager;