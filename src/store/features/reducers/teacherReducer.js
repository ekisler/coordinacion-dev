import {
  TEACHER_LOADING,
  TEACHER_LOADING_END,
  GET_TEACHER,
  GET_TEACHER_BY_ID,
  GET_TEACHER_ERROR,
  GET_TEACHER_BY_ID_ERROR,
  GET_TEACHER_BY_USER_ID_ERROR,
  CREATE_TEACHER,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_ERROR,
  UPDATE_TEACHER_FORM_DATA,
  UPDATE_TEACHER_LOADING_END,
  CLEAR_TEACHER_FORM_DATA,
  ASSIGN_LIST_REQUEST,
  ASSIGN_LIST_SUCCESS,
  ASSIGN_LIST_FAILURE,
  GET_ATTENDANCE_LISTS,
  GET_ALL_ATTENDANCE_LISTS,
  ERROR_ATTENDANCE_LIST,
  ASSIGN_ATTENDANCE_LIST,
} from '../../action-type';

const initialState = {
  teachers: null,
  teacher: null,
  attendanceLists: [],
  formData: {
    teacherName: '',
    teacherLastName: '',
    profession: '',
    birthDate: '',
    birthPlace: '',
    sex: '',
    email: '',
    address: '',
    phone: '',
    imageUrl: null,
    curriculumUrl: null,
  },
  error: null,
  loading: false,
  teacherByIdError: null,
  teacherByUserIdError: null,
};

const teacherReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'RESET_TEACHER':
      return { ...state, teacher: null };

    case GET_TEACHER:
      return {
        ...state,
        teachers: action.payload,
        loading: false,
        error: null,
      };

    case GET_TEACHER_BY_ID:
      return {
        ...state,
        teacher: action.payload,
        loading: false,
        error: null,
      };

    case GET_TEACHER_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    
    case GET_TEACHER_BY_ID_ERROR:
      return {
        ...state,
        teacherByIdError: action.payload,
      };

    case GET_TEACHER_BY_USER_ID_ERROR:
      return {
        ...state,
        teacherByUserIdError: action.payload,
      };

    case TEACHER_LOADING:
      return {
        ...state,
        loading: true,
      };

    case TEACHER_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case CREATE_TEACHER:
      return {
        ...state,
        teachers: action.payload,
        loading: true,
      };

    case CREATE_TEACHER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        error: null,
      };

    case CREATE_TEACHER_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_TEACHER_LOADING_END: {
      return {
        ...state,
        loading: false,
      };
    }

    case UPDATE_TEACHER_FORM_DATA:
      return {
        ...state,
        formData: action.payload,
      };

    case CLEAR_TEACHER_FORM_DATA:
      return {
        ...state,
        formData: {
          teacherName: '',
          teacherLastName: '',
          profession: '',
          birthDate: '',
          birthPlace: '',
          sex: '',
          email: '',
          address: '',
          phone: '',
          imageUrl: null,
          imageUrlPreview: null,
          curriculumUrl: null,
          curriculumUrlPreview: null,
        },
      };

    case ASSIGN_LIST_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case ASSIGN_LIST_SUCCESS:
      return {
        ...state,
        teacher: {
          ...state.teacher,
          assignedList: {
            listId: action.payload.listId,
            grade: action.payload.grade,
            section: action.payload.section,
            schedule: action.payload.schedule,
          },
        },
        loading: false,
        error: null,
      };

    case ASSIGN_LIST_FAILURE:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case GET_ATTENDANCE_LISTS:
      return {
        ...state,
        attendanceLists: action.payload,
      };
      case GET_ALL_ATTENDANCE_LISTS:
      return {
        ...state,
        attendanceLists: action.payload,
      };
    case ASSIGN_ATTENDANCE_LIST:
      return {
        ...state,
        attendanceLists: [...state.attendanceLists, action.payload],
      };
    case ERROR_ATTENDANCE_LIST:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default teacherReducer;
