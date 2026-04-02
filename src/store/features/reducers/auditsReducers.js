import {
  AUDIT_LOADING,
  GET_AUDITS_SUCCESS,
  GET_AUDITS_ERROR,
} from '../../action-type.js';

const initialState = {
  audits: [],
  loading: false,
  error: null,
};

const auditsReducers = (state = initialState, action) => {
  switch (action.type) {
    case AUDIT_LOADING:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GET_AUDITS_SUCCESS:
      return {
        ...state,
        loading: false,
        audits: action.payload,
      };

    case GET_AUDITS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default auditsReducers;
