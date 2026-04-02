import api from "../store/actions/apiInterceptor";

export const refreshAccessToken = async () => {
  try {
    await api.post('/users/refresh-token', {});
    return true;
  } catch (error) {
    console.error(
      'Error al renovar el token:',
      error.response?.data?.message || error.message
    );
    return false; 
  }
};

export const clearCookies = () => {
  document.cookie =
    'accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie =
    'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};
