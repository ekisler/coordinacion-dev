// /store/action/representativeAction
import {
  PLANNING_LOADING,
  PLANNING_LOADING_END,
  GET_PLANNING,
  GET_PLANNING_ERROR,
  UPDATE_PLANNING_SUCCESS,
  UPDATE_PLANNING_ERROR,
  CREATE_PLANNING_SUCCESS,
  CREATE_PLANNING_ERROR,
  RESET_PLANNING_SUCCESS,
  ASSIGN_PLANNING_SUCCESS,
  ASSIGN_PLANNING_ERROR,
  ASSIGNMENT_LOADING,
  GET_ASSIGNMENTS_SUCCESS,
  GET_ASSIGNMENTS_ERROR,
  ASSIGNMENT_LOADING_END,
  RESET_ASSIGNMENTS,
} from '../action-type';
import {
  apiGetPlannings,
  apiUpdatePlanning,
  apiCreatePlanning,
  apiAssignPlanningToTeacher,
  apiGetAssignmentByTeacher,
} from './api';

export const getPlannings = () => async dispatch => {
  dispatch({ type: PLANNING_LOADING, payload: true });
  try {
    const res = await apiGetPlannings();
    dispatch({
      type: GET_PLANNING,
      payload: res.data,
    });
  } catch (error) {
    const errorMessage = error?.response?.data?.error || error.message || 'Error desconocido';
        dispatch({
          type: GET_PLANNING_ERROR,
          payload: errorMessage,
        });
    console.error('Error al obtener la planificación:', error);
  } finally {
    dispatch({ type: PLANNING_LOADING_END });
  }
};

export const getAssignmentsByTeacher = teacherId => async dispatch => { 
  try {
    dispatch({ type: ASSIGNMENT_LOADING });
    const res = await apiGetAssignmentByTeacher(teacherId);    
    dispatch({
      type: GET_ASSIGNMENTS_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
   const errorMessage = error?.response?.data?.error || error.message || 'Error desconocido';

    dispatch({
      type: GET_ASSIGNMENTS_ERROR,
      payload: errorMessage,
    });

    // Si quieres propagar el error para manejarlo en el componente
    throw error;
  } finally {
    dispatch({ 
      type: ASSIGNMENT_LOADING_END, 
    });
  }
};

export const updatePlanning = (id, data) => async dispatch => {
  dispatch({ type: PLANNING_LOADING, payload: true });

  try {
    const res = await apiUpdatePlanning(id, data);

    dispatch({
      type: UPDATE_PLANNING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // console.error('Error al actualizar la planificación:', error);
    dispatch({
      type: UPDATE_PLANNING_ERROR,
      payload: error.response?.data || 'Error desconocido',
    });
  } finally {
    dispatch({ type: PLANNING_LOADING_END, payload: false });
  }
};

export const createPlanning = data => async dispatch => {
  dispatch({ type: PLANNING_LOADING, payload: true });

  try {
    const res = await apiCreatePlanning(data);

    dispatch({
      type: CREATE_PLANNING_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    // console.error('Error al crear la planificación:', error);
    dispatch({
      type: CREATE_PLANNING_ERROR, // Acción de error para crear planificación
      payload: error.response?.data || 'Error desconocido',
    });
  } finally {
    dispatch({ type: PLANNING_LOADING_END, payload: false });
  }
};

export const resetPlanningSuccess = () => ({
  type: RESET_PLANNING_SUCCESS,
});

export const assignPlanningToTeacher = (planningId, teacherId) => async dispatch => {
    dispatch({ type: PLANNING_LOADING, payload: true });

    try {
      const res = await apiAssignPlanningToTeacher(planningId, teacherId);

      dispatch({
        type: ASSIGN_PLANNING_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error desconocido';
      dispatch({
        type: ASSIGN_PLANNING_ERROR,
        payload: errorMessage
      });
      throw new Error(errorMessage)
    } finally {
      dispatch({ type: PLANNING_LOADING_END, payload: false });
    }
  };

export const resetAssignments = () => ({
  type: RESET_ASSIGNMENTS,
});

