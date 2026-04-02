// index.js
import { combineReducers } from 'redux';
import authReducer from './features/reducers/authReducer.js';
import representativeReducer from './features/reducers/representativeReducer';
import studentReducer from './features/reducers/studentReducer';
import teacherReducer from './features/reducers/teacherReducer';
import passwordResetReducer from './features/reducers/passwordResetReducer';
import planningReducer from './features/reducers/planningReducer';
import assignmentsReducer from './features/reducers/assignmentsReducer.js';
import attendancesReducer from './features/reducers/attendancesReducer.js';
import usersReducer from './features/reducers/usersReducers.js';
import auditsReducers from './features/reducers/auditsReducers.js';

const rootReducer = combineReducers({
  auth: authReducer,
  users: usersReducer,
  representatives: representativeReducer,
  students: studentReducer,
  teachers: teacherReducer,
  passwordReset: passwordResetReducer,
  plannings: planningReducer,
  assignments: assignmentsReducer,
  attendances: attendancesReducer,
  audits: auditsReducers
});

export default rootReducer;
