import { combineReducers } from 'redux';
import options from './options';
import score from './score';
import ui from './ui';


const squashApp = combineReducers({
  ui,
  options,
  score
});

export default squashApp;
