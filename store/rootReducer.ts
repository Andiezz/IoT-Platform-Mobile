// ** Redux Imports
import { combineReducers } from '@reduxjs/toolkit';

// ** Reducers Imports
import auth from './slices/auth';

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
