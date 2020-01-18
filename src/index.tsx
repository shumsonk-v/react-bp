//// Uncomment this to enable firebase feature
import './firebase';
import './i18n';

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import appSagas from './sagas/AppSagas';
import * as serviceWorker from './serviceWorker';
import appReducers from './stores/AppReducers';
import { CircularProgress } from '@material-ui/core';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  appReducers,
  applyMiddleware(sagaMiddleware),
);

// Run the sagas
sagaMiddleware.run(appSagas);

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<CircularProgress />}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
