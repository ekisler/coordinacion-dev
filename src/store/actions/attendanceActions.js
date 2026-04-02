import {
  GET_ATTENDANCE_BY_ID,
  GET_ATTENDANCES_REQUEST,
  POST_ATTENDANCE,
  LOCK_ATTENDANCE,
  ATTENDANCE_LOADING,
  ATTENDANCE_LOADING_END,
  ATTENDANCE_ERROR,
  RESET_ATTENDANCE,
} from '../action-type';
import {
  apiGetAttendanceById,
  apiLockAttendance,
  apiPostAttendance,
  apiGetAttendances,
} from './api';

export const getAttendances = () => async dispatch => {
  dispatch({ type: GET_ATTENDANCES_REQUEST });

  try {
    const response = await apiGetAttendances();
    const data = response.data;
    
    dispatch({
      type: 'GET_ATTENDANCES_SUCCESS',
      payload: data,
    });
  } catch (error) {
    console.error("Error al obtener las asistencias:", error);

    let errorMessage = error.message;
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.message || errorMessage;
    }

    dispatch({
      type: 'GET_ATTENDANCES_ERROR',
      payload: errorMessage,
    });
  }
};

export const getAttendanceById = studentId => async dispatch => {
  dispatch({ type: ATTENDANCE_LOADING });
  try {
    const res = await apiGetAttendanceById(studentId);
    dispatch({ type: GET_ATTENDANCE_BY_ID, payload: res.data });
  } catch (error) {
    console.error("Error al obtener la asistencia por ID:", error);

    let errorMessage = error.response?.data?.message || 'Error al obtener la asistencia';
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ATTENDANCE_ERROR,
      payload: errorMessage,
    });
  }
};

export const postAttendance = attendanceData => async dispatch => {
  dispatch({ type: ATTENDANCE_LOADING });
  try {
    const res = await apiPostAttendance(attendanceData);    
    dispatch({
      type: POST_ATTENDANCE,
      payload: res.data.attendance,
    });
  } catch (error) {
    console.error("Error al registrar la asistencia:", error);

    let errorMessage = error.response?.data?.message || 'Error al registrar la asistencia';
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ATTENDANCE_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: ATTENDANCE_LOADING_END });
  }
};

export const lockAttendance = date => async dispatch => {
  dispatch({ type: ATTENDANCE_LOADING });
  try {
    await apiLockAttendance(date);
    dispatch({ type: LOCK_ATTENDANCE });
  } catch (error) {
    console.error("Error al bloquear la asistencia:", error);

    let errorMessage = error.response?.data?.message || 'Error al bloquear la asistencia';
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ATTENDANCE_ERROR,
      payload: errorMessage,
    });
  }
};

export const resetAttendance = () => ({
  type: RESET_ATTENDANCE,
});

export const setAttendanceStatus = (studentId, week, day, status) => ({
  type: 'SET_ATTENDANCE_STATUS', 
  payload: { studentId, week, day, status },
});
