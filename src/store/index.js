/* eslint-env browser */
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

import appReducer from './reducers';
import jsonState from './initialState.json';

const storeFactory = (initialState = {}) =>
  applyMiddleware(thunk)(createStore)(appReducer, initialState);

const initialState = () => {
  if (localStorage['redux-store']) {
    const reduxLocal = JSON.parse(localStorage['redux-store']);
    if (Object.keys(reduxLocal.userInfo).length > 0) {
      reduxLocal.userInfo.passwordDate = new Date(Date.parse(reduxLocal.userInfo.passwordDate));
    }
    return reduxLocal;
  }
  return jsonState;
};

const store = storeFactory(initialState());

const saveState = () => {
  localStorage['redux-store'] = JSON.stringify(store.getState());
};

store.subscribe(saveState);

export default store;
