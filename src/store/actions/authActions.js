// /store/action/authAction
import {
  AUTH_LOADING,
  SET_IS_AUTHENTICATED,
  SET_USER,
  SET_ADMIN,
  SET_DISABLED,
  SET_ERROR,
} from '../action-type';
import {
  apiLoginUser,
  apiLogoutUser,
  apiRegisterUser,
  apiCheckAuthUser,
} from './api';

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const res = await apiLoginUser(username, password);
    dispatch({
      type: 'AUTH_SUCCESS',
      payload: {
        user: res.data,
      },
    });
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.message || 'Hubo un error al iniciar sesión.';
    dispatch({
      type: 'AUTH_ERROR',
      payload: errorMessage,
    });
    return null;
  }
};

export const checkAuthUser = () => async dispatch => {
  try {
    const res = await apiCheckAuthUser();

    dispatch({
      type: 'AUTH_SUCCESS',
      payload: { user: res.data.user },
    });
  } catch (error) {
    dispatch({ type: 'AUTH_LOGOUT' }); // Si falla, cierra sesión
  }
};

export const logoutUser = () => async dispatch => {
  try {
    await apiLogoutUser();
    dispatch({ type: 'AUTH_LOGOUT', payload: null });
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};

export const registerUser = data => async dispatch => {
  try {
    const res = await apiRegisterUser(data);
    return res.data;
  } catch (error) {
    const errorMessage =
      error.response?.data?.error || 'Hubo un error al registrarse.';
    dispatch({
      type: 'AUTH_ERROR',
      payload: errorMessage,
    });
    throw new Error(errorMessage);
  }
};

export const setLoading = isLoading => ({
  type: AUTH_LOADING,
  payload: isLoading,
});

export const setIsAuthenticated = user => ({
  type: SET_IS_AUTHENTICATED,
  payload: user,
});

export const setUser = user => ({
  type: SET_USER,
  payload: user,
});

export const setIsAdmin = isAdmin => ({
  type: SET_ADMIN,
  payload: isAdmin,
});

export const setIsDisabled = isDisabled => ({
  type: SET_DISABLED,
  payload: isDisabled,
});

export const setError = error => ({
  type: SET_ERROR,
  payload: error,
});
