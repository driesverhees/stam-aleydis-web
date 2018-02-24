import MemberDispatcher from './memberDispatcher';
import Member from './objects/member';

const MemberDataManager = {
    loadMembers() {
        // The ajax call should take authentication into account and only return the members where he/she has access to
        // Admin -> All members
        // Someone else -> only him-/herself
        setTimeout(() => {
            MemberDispatcher.dispatch({
                type: 'members/loaded',
                members: [
                    new Member({id: 12, firstName: "JanT", lastName: "TJanssen"}),
                    new Member({id: 13, firstName: "PeterT", lastName: "TPeeters"})
                ]
              });
        }, 1000); // 1000ms = 1sec ajax call

      },
};

export default MemberDataManager;