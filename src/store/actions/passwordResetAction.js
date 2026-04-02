// actions/authActions.js
import {
  COMPLETE_PASSWORD_RESET_ERROR,
  INITIATE_PASSWORD_RESET,
  CLEAR_PASSWORD_RESET,
  COMPLETE_PASSWORD_RESET
} from '../action-type';
import { apiChangePassword, apiInitiatePasswordReset } from './api';

export const startPasswordResetProcess = email => async dispatch => {
  const response = await apiInitiatePasswordReset(email);

  if (response.status !== 200) {
    throw new Error(
      'No se pudo enviar el correo de restablecimiento de contraseña.'
    );
  }

  if (response.data && typeof response.data.email === 'string') {
    const { success, message, email } = response.data;

    if (!success) {
      dispatch({
        type: COMPLETE_PASSWORD_RESET_ERROR,
        payload:
          message ||
          'No se pudo enviar el correo de restablecimiento de contraseña.',
      });
      return;
    }

    dispatch({
      type: INITIATE_PASSWORD_RESET,
      payload: { email, message },
    });
  }
};

export const changePassword = (email, newPassword) => async dispatch => {
  try {
    if (!email) {
      throw new Error('Email no proporcionado');
    }

    const response = await apiChangePassword(email, newPassword);

    if (response.data.message !== 'Contraseña actualizada exitosamente.') {
      throw new Error('Error al cambiar la contraseña');
    }

    dispatch({
      type: CLEAR_PASSWORD_RESET,
      payload: { email, message: response.data.message },
    });

    dispatch({
      type: COMPLETE_PASSWORD_RESET,
      payload: { email, message: response.data.message },
    });

  } catch (error) {
    console.error('Error al cambiar la contraseña:', error);
    dispatch({
      type: COMPLETE_PASSWORD_RESET_ERROR,
      payload: {
        error: error.message || 'Ocurrió un error al cambiar la contraseña',
      },
    });
  }
};

export const clearPasswordReset = () => ({
  type: CLEAR_PASSWORD_RESET,
  payload: {}
});
