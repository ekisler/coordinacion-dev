// authReducer.js
import {
  USER_ID,
  AUTH_LOADING,
  USER_LOADING_END,
  SET_USER,
  SET_IS_AUTHENTICATED,
  SET_ADMIN,
} from '../../action-type';

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user, // Solo guardamos los datos del usuario
        isAuthenticated: true,
        loading: true,
        error: null,
      };

    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        error: null,
      };

    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };

    case USER_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case SET_USER:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
        loading: false,
      };

    case SET_IS_AUTHENTICATED:
      return {
        ...state,
        isAuthenticated: action.payload,
        loading: false,
      };

    case SET_ADMIN:
      return { ...state, isAdmin: action.payload };

    case USER_ID:
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        error: null,
      };

    case 'AUTH_ERROR':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        loading: false,
        error: action.payload,
      };

    case 'CLEAR_AUTH_ERROR':
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export default authReducer;
