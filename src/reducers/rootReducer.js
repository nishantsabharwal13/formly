import { combineReducers } from 'redux';
import fieldsReducer from './appscreens/fields';
import formsReducer from './appscreens/forms';
import recordsReducer from './appscreens/records';

const rootReducer = combineReducers({
  fields: fieldsReducer,
  forms: formsReducer,
  records: recordsReducer,
});

export default rootReducer;