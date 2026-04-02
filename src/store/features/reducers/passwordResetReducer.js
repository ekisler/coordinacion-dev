// features/reducers/passwordResetReducer.js
import {
  INITIATE_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESET_ERROR,
  PASSWORD_RESET_SUCCESS,
  PASSWORD_RESET_ERROR,
  CLEAR_PASSWORD_RESET
} from '../../action-type';

const initialState = {
  forgotPassword: {
    status: 'idle',
    data: null,
    error: null,
    message: null
  },
  changePassword: {
    status: 'idle',
    data: null,
    error: null,
    message: null
  }
};

const passwordResetReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIATE_PASSWORD_RESET:
      return {
        ...state,
        forgotPassword: {
          ...state.forgotPassword,
          status: 'pending',
          data: {
            email: action.payload.email,
            message: action.payload.message
          },
          error: null
        },
        changePassword: {
          ...state.changePassword,
          email: action.payload.email,
        }
      };
    
    // Acciones para changePassword
    case COMPLETE_PASSWORD_RESET:
      return {
        ...state,
        changePassword: {
          ...state.changePassword,
          status: 'completed',
          data: {
            ...state.changePassword.data,
            ...action.payload
          },
          error: null
        }
      };

      case COMPLETE_PASSWORD_RESET_ERROR:
        return {
          ...state,
          changePassword: {
            ...state.changePassword,
            status: 'error',
            error: action.payload,
            data: {
              ...state.changePassword.data
            }
          }
        };

        case PASSWORD_RESET_SUCCESS:
          return {
            ...state,
            changePassword: {
              ...state.changePassword,
              message: action.payload.message,
              error: null
            }
          };
        
        case PASSWORD_RESET_ERROR:
          return {
            ...state,
            changePassword: {
              ...state.changePassword,
              error: action.payload.message,
              message: null
            }
          };

          case CLEAR_PASSWORD_RESET:
            return initialState;

    default:
      return state;
  }
};

export default passwordResetReducer;
