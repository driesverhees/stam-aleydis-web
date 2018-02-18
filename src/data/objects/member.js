import Immutable from 'immutable';

declare class Member {
    id: string;
    firstName: string;
    lastName: string;
  
    constructor(data: {
      id: string;
      firstName: string;
      lastName: string;
    }): void;
  
    set(key: 'id', value: string): Member;
    set(key: 'firstName', value: string): Member;
    set(key: 'lastName', value: string): Member;
  }

const Member = Immutable.Record({
    id: 0,
    firstName: "",
    lastName: ""
});

export default Member;