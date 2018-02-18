'use strict';

export type Action =

  // Dealing with todo ids.
  | {
    type: 'members/start-load',
  }
  | {
    type: 'members/loaded',
    members: Array<string>, // Change to array of member instead of strings
  }
  | {
    type: 'members/load-error',
    error: Error,
  }

  ;