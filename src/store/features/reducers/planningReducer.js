// representativeReducer.js
import {
  PLANNING_LOADING,
  PLANNING_LOADING_END,
  GET_PLANNING,
  GET_PLANNING_BY_ID,
  GET_PLANNING_ERROR,
  CREATE_PLANNING,
  CREATE_PLANNING_SUCCESS,
  CREATE_PLANNING_ERROR,
  RESET_PLANNING_SUCCESS,
  UPDATE_PLANNING_SUCCESS,
  UPDATE_PLANNING_ERROR,
} from '../../action-type';

const initialState = {
  plannings: [],
  planning: [],
  error: null,
  loading: false,
  success: false,
};

const planningReducer = (state = initialState, action) => {
  switch (action.type) {

    case GET_PLANNING:
      return {
        ...state,
        plannings: action.payload,
        loading: false,
        error: null,
      };

    case GET_PLANNING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_PLANNING_BY_ID:
      return {
        ...state,
        planning: action.payload,
        loading: false,
        error: null,
      };

    case UPDATE_PLANNING_SUCCESS:
      return {
        ...state,
        plannings: state.plannings.map(planning =>
          planning._id === action.payload._id ? action.payload : planning
        ),
        loading: false,
        error: null,
        success: true,
      };

    case UPDATE_PLANNING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case PLANNING_LOADING:
      return {
        ...state,
        loading: true,
        success: false,
      };

    case PLANNING_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case CREATE_PLANNING:
      return {
        ...state,
        plannings: action.payload,
        loading: true,
        success: false,
      };

    case CREATE_PLANNING_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        success: true,
        error: null,
        plannings: [...state.plannings, action.payload],
      };

    case CREATE_PLANNING_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
        success: false,
      };

    case RESET_PLANNING_SUCCESS:
      return {
        ...state,
        success: false,
      };

    default:
      return state;
  }
};

export default planningReducer;
