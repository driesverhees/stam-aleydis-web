import * as Actions from './memberActions';
import MemberDispatcher from './memberDispatcher';
import Member from './objects/member';

const MemberDataManager = {
    loadMembers() {
        // The ajax call should take authentication into account and only return the members where he/she has access to
        // Admin -> All members
        // Someone else -> only him-/herself
        setTimeout(() => {
            MemberDispatcher.dispatch({
                type: Actions.Loaded,
                members: [
                    new Member({id: 12, firstName: "Jan", lastName: "Janssens"}),
                    new Member({id: 13, firstName: "Peter", lastName: "Peeters"})
                ]
              });
        }, 1000); // 1000ms = 1sec ajax call

      },

      updateMember(member) {
          setTimeout(() => {
            MemberDispatcher.dispatch({
                type: Actions.Updated,
                member: member // Updated member info (returned from service)
              });
          }, 1000);
      }
};

export default MemberDataManager;