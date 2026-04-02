// representativeReducer.js
import {
  STUDENT_LOADING,
  STUDENT_LOADING_END,
  GET_STUDENT,
  GET_STUDENT_BY_ID,
  GET_STUDENT_BY_ID_ERROR,
  GET_STUDENT_ERROR,
  CREATE_STUDENT,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  UPDATE_STUDENT_FORM_DATA,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_ERROR,
  UPDATE_STUDENT_LOADING_END,
  CLEAR_STUDENT_FORM_DATA,
} from '../../action-type';

const initialState = {
  students: null,
  student: null,
  formData: {
    studentName: '',
    studentLastName: '',
    grade: '',
    section: '',
    schedule: '',
    birthDate: '',
    sex: '',
    size: '',
    email: '',
    address: '',
    phone: '',
    imageUrl: null,
    imageUrlPreview: null,
    fide_num: '',
    birthPlace: '',
  },
  error: null,
  loading: false,
  studentByIdError: null,
};

const studentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_STUDENT:
      return {
        ...state,
        students: action.payload,
        loading: false,
        error: null,
      };

    case GET_STUDENT_BY_ID:
      return {
        ...state,
        student: action.payload,
        loading: false,
        error: null,
      };

    case GET_STUDENT_ERROR:
      return {
        ...state,
        error: action.payload,
      }

    case GET_STUDENT_BY_ID_ERROR:
      return {
        ...state,
        studentByIdError: action.payload,
      }

    case STUDENT_LOADING:
      return {
        ...state,
        loading: true,
      };

    case STUDENT_LOADING_END:
      return {
        ...state,
        loading: false,
      };

    case CREATE_STUDENT:
      return {
        ...state,
        students: action.payload,
        loading: true,
      };

    case CREATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };

    case CREATE_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_STUDENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case UPDATE_STUDENT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_STUDENT_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_STUDENT_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };

    case CLEAR_STUDENT_FORM_DATA:
      return {
        ...state,
        formData: {
          studentName: '',
          studentLastName: '',
          grade: '',
          section: '',
          schedule: '',
          birthDate: '',
          birthPlace: '',
          sex: '',
          email: '',
          address: '',
          phone: '',
          imageUrl: null,
          imageUrlPreview: null,
          fide_num: '',
          size: '',
        },
      };

    default:
      return state;
  }
};

export default studentReducer;
