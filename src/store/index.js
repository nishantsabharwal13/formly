import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '~/reducers/rootReducer';
import logger from 'redux-logger';

let middleware = [thunk];


if (__DEV__) {
  middleware = [...middleware, logger];
} 

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(...middleware)
  );
}
