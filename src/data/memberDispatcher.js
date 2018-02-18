import {Dispatcher} from 'flux';
import type {Action} from './memberActions';
const dispatcher: Dispatcher<Action> = new Dispatcher();
export default dispatcher;