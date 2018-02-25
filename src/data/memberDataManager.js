import * as Actions from './memberActions';
import MemberDispatcher from './memberDispatcher';
import Member from './objects/member';

let mockMemberData = [
    new Member({id: 12, firstName: "Jan", lastName: "Janssens"}),
    new Member({id: 13, firstName: "Peter", lastName: "Peeters"})
];

const MemberDataManager = {
    loadMembers() {
        // The ajax call should take authentication into account and only return the members where he/she has access to
        // Admin -> All members
        // Someone else -> only him-/herself
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(membersData) {
            MemberDispatcher.dispatch({
                type: Actions.Loaded,
                members: membersData
              });
        });
        // Simulate an Ajax call and put (after 1sec) the deferred object in the done-state
        setTimeout(() => {
            deferredObj.resolve(mockMemberData)
        }, 1000); // 1000ms = 1sec ajax call
        // Return the promise object, so caller can't change the deferred object
        return deferredObj.promise();
      },

      updateMember(memberData) {
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(updatedMemberData) {
            // Possible improvement: Dispatch an "updated" action and only update the new member
            // The data for the new member is provided as an input to this function
            // For now, trigger a refresh of the store
            MemberDispatcher.dispatch({
                type: Actions.Refresh
            });
        });
        // Simulate Ajax call and put in done after 1 second
        setTimeout(() => {
            // Find matching element
            let arrayIndex = mockMemberData.findIndex((mem) => mem.id === memberData.id);
            if (arrayIndex >= 0) {
                mockMemberData[arrayIndex] = memberData;
                deferredObj.resolve(memberData);
            } else {
                alert("cannot find ID");
                // Error
            }
        }, 1000);
        // Return the promise object
        return deferredObj.promise();
      },

      createMember(memberData) {
        let deferredObj = window.jQuery.Deferred();
        deferredObj.done(function(newMemberData) {
            // For now, trigger a refresh of the store
            MemberDispatcher.dispatch({
                type: Actions.Refresh
            });              
        });
        setTimeout(() => {
            let newMockMemberId = Math.floor(Math.random() * 100000000); // Random number between 0 and 1e8
            let newMemberObj = new Member(Object.assign({},memberData, {id: newMockMemberId}));
            mockMemberData.push(newMemberObj);
            deferredObj.resolve(newMemberObj);
        }, 1000);
        // Return the promise object
        return deferredObj.promise();
      }
};

export default MemberDataManager;