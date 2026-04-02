// representativeReducer.js
import {
  REPRESENTATIVE_LOADING,
  REPRESENTATIVE_LOADING_END,
  GET_REPRESENTATIVE,
  GET_REPRESENTATIVE_BY_ID,
  GET_REPRESENTATIVE_ERROR,
  CREATE_REPRESENTATIVE,
  CREATE_REPRESENTATIVE_SUCCESS,
  CREATE_REPRESENTATIVE_ERROR,
  UPDATE_REPRESENTATIVE_FORM_DATA,
  UPDATE_REPRESENTATIVE_SUCCESS,
  UPDATE_REPRESENTATIVE_ERROR,
  UPDATE_REPRESENTATIVE_LOADING_END,
  CLEAR_REPRESENTATIVE_FORM_DATA,
  GET_REPRESENTATIVE_BY_ID_ERROR,
} from '../../action-type';

const initialState = {
  representatives: null,
  representative: null,
  formData: {
    representativeName: '',
    representativeLastName: '',
    profession: '',
    birthDate: '',
    birthPlace: '',
    sex: '',
    email: '',
    address: '',
    phone: '',
    imageUrl: null,
  },
  error: null,
  loading: false,
  getRepresentativeByIdError: null,
};

const representativeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_REPRESENTATIVE:
      return {
        ...state,
        representatives: action.payload,
        loading: false,
        error: null,
      };

    case GET_REPRESENTATIVE_BY_ID:
      return {
        ...state,
        representative: action.payload,
        loading: false,
        error: null,
      };

    case GET_REPRESENTATIVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case GET_REPRESENTATIVE_BY_ID_ERROR:
      return {
        ...state,
        loading: false,
        getRepresentativeByIdError: action.payload,
      };

    case REPRESENTATIVE_LOADING:
      return {
        ...state,
        loading: true,
      };

    case REPRESENTATIVE_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case CREATE_REPRESENTATIVE:
      return {
        ...state,
        representatives: action.payload,
        loading: true,
      };

    case CREATE_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };

    case CREATE_REPRESENTATIVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_REPRESENTATIVE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UPDATE_REPRESENTATIVE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_REPRESENTATIVE_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_REPRESENTATIVE_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };

    case CLEAR_REPRESENTATIVE_FORM_DATA:
      return {
        ...state,
        formData: {
          representativeName: '',
          representativeLastName: '',
          profession: '',
          birthDate: '',
          birthPlace: '',
          sex: '',
          email: '',
          address: '',
          phone: '',
          imageUrl: null,
          imageUrlPreview: null,
        },
      };

    default:
      return state;
  }
};

export default representativeReducer;
