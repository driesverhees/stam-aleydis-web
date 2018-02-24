import Immutable from 'immutable';

const ErrorRecord = Immutable.Record({
    message: ""
}, "Error");

export default ErrorRecord;