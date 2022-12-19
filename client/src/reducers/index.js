import { combineReducers } from 'redux';

import authReducer from './authReducer';
import postReducer from './postReduces';
export const reducers = combineReducers({ authReducer, postReducer });
