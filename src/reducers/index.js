import { combineReducers } from 'redux';
import options from './options';
import score from './score';


const squashApp = combineReducers({
  options,
  score
});

export default squashApp;
