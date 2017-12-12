import { combineReducers } from 'redux';

import C from '../constants';

const userAuth = (state = {}, action) => (
  (action.type === C.USER_AUTH) ? action.payload : state
);

const userInfo = (state = {}, action) => (
  (action.type === C.USER) ? action.payload : state
);

const error = (state = { type: '', message: '' }, action) => (
  (action.type === C.ERROR) ? action.payload : state
);

const message = (state = { type: '', message: '' }, action) => (
  (action.type === C.MESSAGE) ? action.payload : state
);


export default combineReducers({
  userAuth,
  userInfo,
  error,
  message,
});
