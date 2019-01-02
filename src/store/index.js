import { createStore, applyMiddleware } from 'redux';
import rootReducer from '~/reducers/rootReducer';

import thunk from 'redux-thunk';
import logger from 'redux-logger';

import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'

import Fields from '~/data/fields';

const initialState = {
  fields: Fields
};

let middleware = [thunk];

const persistConfig = {
  key: 'root9',
  storage,
  stateReconciler: hardSet,
  timeout: null,
}

if (__DEV__) {
  middleware = [...middleware, logger];
} 

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store =  createStore(
    persistedReducer,
    initialState,
    applyMiddleware(...middleware)
  );

export const persistor = persistStore(store);

export default () => {
  return { store, persistor }
}