// /store/action/representativeAction
import {
  STUDENT_LOADING,
  STUDENT_LOADING_END,
  GET_STUDENT,
  GET_STUDENT_BY_ID,
  GET_STUDENT_ERROR,
  GET_STUDENT_BY_ID_ERROR,
  CREATE_STUDENT_SUCCESS,
  CREATE_STUDENT_ERROR,
  UPDATE_STUDENT_SUCCESS,
  UPDATE_STUDENT_ERROR,
  UPDATE_STUDENT_LOADING_END,
} from '../action-type';
import {
  apiGetStudentId,
  apiGetStudents,
  apiPostOnlyStudent,
  apiPostStudent,
  apiUpdateStudent,
  apiDeleteStudent,
} from './api';

export const getStudents = () => async dispatch => {
  dispatch({ type: STUDENT_LOADING, payload: true });
  try {
    const res = await apiGetStudents();
    dispatch({
      type: GET_STUDENT,
      payload: res.data,
    });
  } catch (error) {
    // Inspecciona el objeto de error
    console.error("Error fetching students:", error);

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
      type: GET_STUDENT_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: STUDENT_LOADING_END });
  }
};

export const getStudentById = id => async dispatch => {
  try {
    dispatch({ type: STUDENT_LOADING });
    const res = await apiGetStudentId(id);
    dispatch({
      type: GET_STUDENT_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching student by ID:", error);

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
      type: GET_STUDENT_BY_ID_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: STUDENT_LOADING_END });
  }
};

export const postOnlyStudent = data => async dispatch => {
  try {
    dispatch({ type: STUDENT_LOADING });
    const res = await apiPostOnlyStudent(data);
    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);

    let errorMessage = 'Hubo un error al registrar el estudiante.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: CREATE_STUDENT_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: STUDENT_LOADING_END });
  }
};

export const postStudent = data => async dispatch => {
  try {
    dispatch({ type: STUDENT_LOADING });
    const res = await apiPostStudent(data);
    dispatch({
      type: CREATE_STUDENT_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    console.error("Error al registrar el estudiante:", error);

    let errorMessage = 'Hubo un error al registrar el estudiante.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: CREATE_STUDENT_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: STUDENT_LOADING_END });
  }
};

export const updateStudents = (id, data) => async dispatch => {
  try {
    dispatch({ type: STUDENT_LOADING });
    const res = await apiUpdateStudent(id, data);
    dispatch({
      type: UPDATE_STUDENT_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error("Error al actualizar el estudiante:", error);

    let errorMessage = 'Hubo un error al registrar al estudiante.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_STUDENT_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: UPDATE_STUDENT_LOADING_END });
  }
};

export const deleteStudent = (id, isDisabled) => async dispatch => {
  try {
    dispatch({ type: STUDENT_LOADING });

    await apiDeleteStudent(id, isDisabled);

    dispatch(getStudents());
  } catch (error) {
    console.error("Error al eliminar el estudiante:", error);

    let errorMessage = error.message;
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_STUDENT_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: STUDENT_LOADING_END });
  }
};
