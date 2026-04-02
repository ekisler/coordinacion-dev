// /store/action/representativeAction
import {
  REPRESENTATIVE_LOADING,
  REPRESENTATIVE_LOADING_END,
  GET_REPRESENTATIVE,
  GET_REPRESENTATIVE_BY_ID_ERROR,
  GET_REPRESENTATIVE_BY_ID,
  GET_REPRESENTATIVE_ERROR,
  CREATE_REPRESENTATIVE_SUCCESS,
  CREATE_REPRESENTATIVE_ERROR,
  UPDATE_REPRESENTATIVE_SUCCESS,
  UPDATE_REPRESENTATIVE_ERROR,
  
} from '../action-type';
import {
  apiGetRepresentative,
  apiGetRepresentativeId,
  apiPostRepresentative,
  apiUpdateRepresentative,
  apiDeleteRepresentative,
} from './api';

export const getRepresentative = () => async dispatch => {
  dispatch({ type: REPRESENTATIVE_LOADING, payload: true });
  try {
    const res = await apiGetRepresentative();
    dispatch({
      type: GET_REPRESENTATIVE,
      payload: res.data,
    });
  } catch (error) {
    // Inspecciona el objeto de error
    console.error("Error fetching representative:", error);

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
      type: GET_REPRESENTATIVE_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: REPRESENTATIVE_LOADING_END });
  }
};

export const getRepresentativesById = id => async dispatch => {
  try {
    dispatch({ type: REPRESENTATIVE_LOADING });
    const res = await apiGetRepresentativeId(id);
    dispatch({
      type: GET_REPRESENTATIVE_BY_ID,
      payload: res.data,
    });
  } catch (error) {
    console.error("Error fetching representative by ID:", error);

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
      type: GET_REPRESENTATIVE_BY_ID_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: REPRESENTATIVE_LOADING_END });
  }
};

export const postRepresentative = data => async dispatch => {
  try {
    dispatch({ type: REPRESENTATIVE_LOADING });
    const res = await apiPostRepresentative(data);
    dispatch({
      type: CREATE_REPRESENTATIVE_SUCCESS,
      payload: res.data,
    });

    return res.data;
  } catch (error) {
    console.error("Error posting representative:", error);

    let errorMessage = 'Hubo un error al registrar el representante.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: CREATE_REPRESENTATIVE_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: REPRESENTATIVE_LOADING_END });
  }
};

export const updateRepresentatives = (id, data) => async dispatch => {
  try {
    dispatch({ type: REPRESENTATIVE_LOADING });
    const res = await apiUpdateRepresentative(id, data);
    dispatch({
      type: UPDATE_REPRESENTATIVE_SUCCESS,
      payload: res.data,
    });
    return res.data;
  } catch (error) {
    console.error("Error updating representative:", error);

    let errorMessage = 'Hubo un error al registrar al representante.';
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_REPRESENTATIVE_ERROR,
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  } finally {
    dispatch({ type: REPRESENTATIVE_LOADING_END });
  }
};

export const deleteRepresentative = (id, isDisabled) => async dispatch => {
  try {
    dispatch({ type: REPRESENTATIVE_LOADING });

    await apiDeleteRepresentative(id, isDisabled);

    dispatch(getRepresentative());
  } catch (error) {
    console.error("Error deleting representative:", error);

    let errorMessage = error.message;
    if (error.response) {
      if (error.response.status === 401) {
        return; // Ignorar el error 401
      }
      errorMessage = error.response.data?.error || errorMessage;
    }

    dispatch({
      type: UPDATE_REPRESENTATIVE_ERROR,
      payload: errorMessage,
    });
  } finally {
    dispatch({ type: REPRESENTATIVE_LOADING_END });
  }
};
