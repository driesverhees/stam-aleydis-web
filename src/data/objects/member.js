import Immutable from 'immutable';

const Member = Immutable.Record({
    id: 0,
    firstName: "",
    lastName: "",
    email: ""
}, "Member");

export default Member;