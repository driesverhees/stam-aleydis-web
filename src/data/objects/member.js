import Immutable from 'immutable';

const Member = Immutable.Record({
    id: 0,
    firstName: "",
    lastName: ""
}, "Member");

export default Member;