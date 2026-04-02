// /store/action/representativeAction
import {
  TEACHER_LOADING,
  TEACHER_LOADING_END,
  GET_TEACHER,
  GET_TEACHER_BY_ID,
  GET_TEACHER_ERROR,
  GET_TEACHER_BY_ID_ERROR,
  GET_TEACHER_BY_USER_ID_ERROR,
  CREATE_TEACHER_SUCCESS,
  CREATE_TEACHER_ERROR,
  UPDATE_TEACHER_SUCCESS,
  UPDATE_TEACHER_ERROR,
  GET_ATTENDANCE_LISTS,
  GET_ALL_ATTENDANCE_LISTS,
  ERROR_ATTENDANCE_LIST,
  ASSIGN_LIST_FAILURE,
  ASSIGN_LIST_SUCCESS,
} from '../action-type';
import {
  apiGetTeachers,
  apiGetTeacherId,
  apiPostTeacher,
  apiGetTeacherByUserId,
  apiUpdateTeacher,
  apiDeleteTeacher,
  apiGetAttendancesListById,
  apiGetAllAttendanceLists,
  apiAssignAttendanceList,
} from './api';

export const getTeachers = () => async dispatch => {
  dispatch({ type: TEACHER_LOADING, payload: true });
  try {
    const res = await apiGetTeachers();
    dispatch({
      type: GET_TEACHER,
      payload: res.data,
    });
  } catch (error) {
    // Inspecciona el objeto de error
    console.error("Error fetching teachers:", error);

    // Manejo de errores más robusto
    let errorMessage = 'Error desconocido';
    if (error.response) {
      // Si hay una respuesta del servidor
      if (error.response.status === 401) {
        // Ignorar el error 401 si se está intentando refrescar el token
        return; // Salir sin despachar un error
      }
      if (error.response.data && error.response.data.error) {
        errorMessage = error.response.data.error; // Mensaje de error específico
      } else {
        errorMessage = error.response.statusText; // Mensaje de estado
      }
    } else if (error.message) {
      errorMessage = error.message; // Mensaje de error general
    }

    dispatch({
      type: GET_TEACHER_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const getTeachersById = id => async dispatch => {
  try {
    dispatch({ type: TEACHER_LOADING });
    const res = await apiGetTeacherId(id);
    dispatch({
      type: GET_TEACHER_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error al obtener el profesor por ID:', error);

    let errorMessage = 'Error desconocido';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: GET_TEACHER_BY_ID_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const getTeacherByUserId = userId => async dispatch => {
  try {
    dispatch({ type: TEACHER_LOADING });
    const res = await apiGetTeacherByUserId(userId);
    dispatch({
      type: GET_TEACHER_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.error('Error al obtener el profesor por userId:', error);

    let errorMessage = 'Error desconocido';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || error.message;
    } else if (error.message) {
      errorMessage = error.message;
    }

    dispatch({
      type: GET_TEACHER_BY_USER_ID_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const postTeachers = data => async dispatch => {
  try {
    dispatch({ type: TEACHER_LOADING });
    const res = await apiPostTeacher(data);
    dispatch({
      type: CREATE_TEACHER_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    console.error('Error al crear el profesor:', error);

    let errorMessage = 'Hubo un error al registrar el profesor.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: CREATE_TEACHER_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const updateTeachers = (id, data) => async dispatch => {
  try {
    dispatch({ type: TEACHER_LOADING });
    const res = await apiUpdateTeacher(id, data);
    dispatch({
      type: UPDATE_TEACHER_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error('Error al actualizar el profesor:', error);

    let errorMessage = 'Hubo un error al registrar el profesor.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_TEACHER_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const deleteTeacher = (id, isDisabled) => async dispatch => {
  try {
    dispatch({ type: TEACHER_LOADING });

    await apiDeleteTeacher(id, isDisabled);

    dispatch(getTeachers());
  } catch (error) {
    console.error('Error al eliminar el profesor:', error);

    let errorMessage = error.message;
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_TEACHER_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: TEACHER_LOADING_END });
  }
};

export const getAttendanceListsById = userId => async dispatch => {
  try {
    const response = await apiGetAttendancesListById(userId);
    const data = response.data || [];
    dispatch({
      type: GET_ATTENDANCE_LISTS,
      payload: data,
    });
  } catch (error) {
    console.error('Error al obtener las listas de asistencia:', error);

    let errorMessage = error.response?.data?.error || 'Error al obtener las listas';
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ERROR_ATTENDANCE_LIST,
      payload: errorMessage,
    });
  }
};

export const getAllAttendanceLists = () => async dispatch => {
  try {
    const response = await apiGetAllAttendanceLists();
    const data = response.data || [];

    dispatch({
      type: GET_ALL_ATTENDANCE_LISTS,
      payload: data,
    });
  } catch (error) {
    console.error('Error al obtener todas las listas de asistencia:', error);

    let errorMessage = error.response?.data?.error || "Error al obtener todas las listas";
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ERROR_ATTENDANCE_LIST,
      payload: errorMessage,
    });
  }
};

export const assignAttendanceList = (userId, grade, section, schedule) => async dispatch => {
  try {
    const response = await apiAssignAttendanceList(userId, grade, section, schedule);
    dispatch({ type: ASSIGN_LIST_SUCCESS, payload: response.data });
    return response.data;
  } catch (error) {
    console.error('Error asignando la lista:', error);

    let errorMessage = error.response?.data?.error || 'Error asignando la lista';
    if (error.response && error.response.status === 401) {
      return; // Ignorar el error 401
    }

    dispatch({
      type: ASSIGN_LIST_FAILURE,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};
