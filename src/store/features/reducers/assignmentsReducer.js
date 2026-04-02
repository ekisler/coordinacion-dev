import {
  ASSIGNMENT_LOADING,
  ASSIGNMENT_LOADING_END,
  GET_ASSIGNMENTS_SUCCESS,
  GET_ASSIGNMENTS_ERROR,
  RESET_ASSIGNMENTS,
} from '../../action-type';

const initialState = {
  assignments: [],
  loading: false,
  error: null,
};

const assignmentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_ASSIGNMENTS:
      return { ...state, assignments: [] };

    case ASSIGNMENT_LOADING:
      return { 
        ...state, 
        loading: true };

    case ASSIGNMENT_LOADING_END:
      return { 
        ...state, 
        loading: false };

    case GET_ASSIGNMENTS_SUCCESS:
      return {
        ...state,
        assignments: action.payload || [],
        loading: false,
        error: null,
      };

    case GET_ASSIGNMENTS_ERROR:
      return { 
        ...state, 
        loading: 
        false, error: action.payload };

    default:
      return state;
  }
};

export default assignmentsReducer;
