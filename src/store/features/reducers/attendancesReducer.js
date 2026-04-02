import {
  ATTENDANCE_LOADING,
  ATTENDANCE_ERROR,
  RESET_ATTENDANCE,
  GET_ATTENDANCE_BY_ID,
  POST_ATTENDANCE,
  LOCK_ATTENDANCE,
  GET_ATTENDANCES_REQUEST,
  GET_ATTENDANCES_SUCCESS,
  GET_ATTENDANCES_ERROR,
} from '../../action-type';

const initialState = {
  attendances: [],
  attendance: null,
  loading: false,
  error: null,
};

const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ATTENDANCES_REQUEST:
      return { 
        ...state, 
        loading: true 
      };

    case GET_ATTENDANCES_SUCCESS:
      return { 
        ...state, 
        attendances: action.payload,
        loading: false,
        error: null 
      };

    case GET_ATTENDANCES_ERROR:
      return { 
        ...state, 
        error: action.payload,
        loading: false 
      };

    case ATTENDANCE_LOADING:
      return { 
        ...state, 
        loading: true, 
        error: null 
      };

      case GET_ATTENDANCE_BY_ID:
      return {
        ...state,
        attendances: {
          ...state.attendances,
          [action.payload.studentId]: action.payload.attendance,
        },
        loading: false,
      };

      case POST_ATTENDANCE:
  const existingIndex = state.attendances.findIndex(
    (attendance) =>
      attendance.studentId === action.payload.studentId &&
      attendance.week === action.payload.week &&
      attendance.day === action.payload.day
  );

  if (existingIndex !== -1) {
    // Si existe, actualiza la asistencia
    const updatedAttendances = [...state.attendances];
    updatedAttendances[existingIndex] = action.payload;
    return {
      ...state,
      attendances: updatedAttendances,
      loading: false,
    };
  } else {
    // Si no existe, agrega la nueva asistencia
    return {
      ...state,
      attendances: [...state.attendances, action.payload],
      loading: false,
    };
  }

    case LOCK_ATTENDANCE:
      return { 
        ...state, 
        loading: false 
      };

    case ATTENDANCE_ERROR:
      return { 
        ...state, 
        error: action.payload, 
        loading: false 
      };

    case RESET_ATTENDANCE:
      return { 
        ...state, 
        attendances: [], 
        error: null 
      };

    default:
      return state;
  }
};

export default attendanceReducer;
