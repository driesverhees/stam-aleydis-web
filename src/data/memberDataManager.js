import Member from './objects/member';
import MemberDispatcher from './memberDispatcher';

const MemberDataManager = {
    loadMembers() {
        MemberDispatcher.dispatch({
            type: 'members/loaded',
            members: ["Jan", "Peter"],
          });
      },
};

export default MemberDataManager;