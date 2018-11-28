import { combineReducers } from 'redux';
import homeReducer from './appscreens/home';
import fieldsReducer from './appscreens/fields';
import formCreateReducer from './appscreens/forms';

const rootReducer = combineReducers({
  home: homeReducer,
  fields: fieldsReducer,
  forms: formCreateReducer
});

export default rootReducer;