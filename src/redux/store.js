import {createStore, applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';

import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native
import {createLogger} from 'redux-logger';
import thunk from 'redux-thunk';
import reducers from './index';

const persistConfig = {
  key: 'root',
  storage,
};
const persistedReducer = persistReducer (persistConfig, reducers);

export function configureStore (initialState) {
  let middleware = [];
  const logger = createLogger ({collapsed: true});

  middleware = [thunk, logger];

  const store = createStore (
    persistedReducer,
    initialState,
    applyMiddleware (...middleware)
  );
  let persistor = persistStore (store);

  // to clear state

//   persistor.purge ();

  return {store, persistor};
}
export const storeInst = configureStore ();
