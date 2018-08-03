import { AsyncStorage } from 'react-native';

import { applyMiddleware, createStore, compose } from 'redux';
import { persistReducer } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';

import { createLogger } from 'redux-logger';

import reducers from '../reducers';
import mySaga from '../sagas';

const config = {
  key: 'primary',
  storage: AsyncStorage,
  whitelist: ['settings', 'user', 'points'],
};

const persistedReducer = persistReducer(config, reducers);

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middlewares.push(createLogger());
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default createStore(
  persistedReducer,
  undefined,
  composeEnhancers(applyMiddleware(...middlewares)),
);

sagaMiddleware.run(mySaga);
