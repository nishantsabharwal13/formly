import { combineReducers } from 'redux';
import homeReducer from './appscreens/home';
import fieldsReducer from './appscreens/fields';

const rootReducer = combineReducers({
  home: homeReducer,
  fields: fieldsReducer
});

export default rootReducer;