import { combineReducers } from 'redux';
import { studentReducer } from './App.redux';

const rootReducer = combineReducers({
  studentReducer,
});

export default rootReducer;