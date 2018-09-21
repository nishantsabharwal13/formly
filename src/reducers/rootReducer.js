import { combineReducers } from 'redux';
import homeReducer from './appscreens/home';

const rootReducer = combineReducers({
  home: homeReducer
});

export default rootReducer;