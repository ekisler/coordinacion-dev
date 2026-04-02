import { AUDIT_LOADING, GET_AUDITS_SUCCESS, GET_AUDITS_ERROR } from "../action-type";
import { apiGetAudits } from "./api.js";

export const getAudits = () => async dispatch => {
    try {
      dispatch({ type: AUDIT_LOADING });
      const res = await apiGetAudits();
      dispatch({
        type: GET_AUDITS_SUCCESS,
        payload: res.data,
      });
    } catch (error) {
      console.error("Error al obtener auditorías:", error);
     
      let errorMessage = error.errorMessage
      if (error.response) {
        if (error.response.status === 401) {
          return; // Ignorar el error 401
        } else {
          errorMessage = error.response.data.message || errorMessage;
        }
      }
     
      dispatch({
        type: GET_AUDITS_ERROR,
        payload: errorMessage,
      });
    }
  };
  